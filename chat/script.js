import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  onValue,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

// ==================== FIREBASE CONFIG ====================
const firebaseConfig = {
  apiKey: 'AIzaSyCYlPMPVxn-AUfMSNg6hQVkfX5tOtCIUMU',
  authDomain: 'ic-hat-v5.firebaseapp.com',
  databaseURL: 'https://ic-hat-v5-default-rtdb.firebaseio.com',
  projectId: 'ic-hat-v5',
  storageBucket: 'ic-hat-v5.firebasestorage.app',
  messagingSenderId: '247586562906',
  appId: '1:247586562906:web:1a8c683812e6fb3a63c963',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ==================== DOM ELEMENTS ====================
const chatListEl = document.querySelector('.chat-list');
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameEl = document.getElementById('user-name');
const statusMessageEl = document.getElementById('status-message');
const newDiscussionBtn = document.querySelector('.bx-message-square-add');
const addFriendBtn = document.querySelector('.bx-user-plus');

// ==================== STATE ====================
let currentUser = null;
let currentDiscussion = null;         // { id, ...meta }
let discussions = {};                  // { [id]: { id, ...meta } }  — NO messages here
let usersCache = {};
let selectedUsers = [];

// Per-discussion listeners so we can detach them individually
let discussionMetaListeners = {};     // { [id]: unsubscribeFn }

// Active message listener for the currently open chat
let activeMessageUnsub = null;

// ==================== VIRTUAL SCROLL STATE ====================
/**
 * Instead of appending every message DOM node, we keep all messages in an
 * in-memory array and only render a sliding window of nodes inside the
 * scrollable container.  A single IntersectionObserver watches sentinel
 * <div>s at the top and bottom of the rendered window; when they become
 * visible the window shifts and off-screen nodes are removed.
 *
 * Layout:
 *   [spacerTop]        ← height = ROW_H * firstRendered
 *   [...rendered msgs]
 *   [spacerBottom]     ← height = ROW_H * (total - lastRendered - 1)
 */
const BATCH = 30;          // how many messages to render at once
const ROW_H = 48;          // estimated px per message row (used for spacers)

let allMessages = [];      // sorted array of { text, sender, timestamp }
let renderStart = 0;       // index of first rendered message
let renderEnd = 0;         // index of last rendered message (exclusive)
let spacerTop = null;
let spacerBottom = null;
let sentinelTop = null;
let sentinelBottom = null;
let scrollObserver = null;

// ==================== AUTH STATE ====================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '/';
  } else {
    currentUser = user;
    userNameEl.textContent = user.displayName || user.email;
    statusMessageEl.textContent = 'Online';
    ensureUserInDB();
    loadMyDiscussions();
    loadUsersRealtime();
  }
});

logoutBtn.addEventListener('click', () => signOut(auth));

// ==================== HELPERS ====================

function sanitize(text) {
  const r = /[^\u0300-\u036F\u0489]+/g;
  return ((text || '').slice(0, 2000).match(r) || ['']).join('');
}

// ==================== USERS ====================

async function ensureUserInDB() {
  const userRef = ref(db, `users/${currentUser.uid}`);
  const snap = await get(userRef);
  if (!snap.exists()) {
    await set(userRef, {
      uid: currentUser.uid,
      email: currentUser.email,
      name: currentUser.displayName || currentUser.email.split('@')[0],
    });
  }
}

function loadUsersRealtime() {
  // We only need name/email/uid — safe, not discussions
  onValue(ref(db, 'users'), (snap) => {
    usersCache = snap.exists() ? snap.val() : {};
  });
}

function searchUsers(queryText) {
  if (!queryText) return [];
  const q = queryText.toLowerCase().trim();
  return Object.values(usersCache).filter(
    (u) =>
      u.uid !== currentUser.uid &&
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase() === q)
  );
}

// ==================== DISCUSSIONS (secure) ====================
/**
 * Security model
 * ──────────────
 * • We NEVER subscribe to the root `discussions` node — that would let any
 *   authenticated user read everyone's conversations.
 * • Instead each user has an index at  users/{uid}/discussionIds  which is
 *   only readable by that uid (enforced in Firebase rules).
 * • We then subscribe individually to  discussions/{id}/meta  for each id.
 *   Firebase rules ensure that node is only readable if auth.uid is listed
 *   in meta.members.
 * • Messages live at  discussions/{id}/messages  and are only fetched/
 *   subscribed when the user actually opens that conversation.
 *
 * Required Firebase Realtime DB rules (paste into your console):
 * ──────────────────────────────────────────────────────────────
 * {
 *   "rules": {
 *     "users": {
 *       "$uid": {
 *         ".read":  "$uid === auth.uid",
 *         ".write": "$uid === auth.uid"
 *       }
 *     },
 *     "discussions": {
 *       "$discussionId": {
 *         "meta": {
 *           ".read":  "data.child('members').child(auth.uid).exists()",
 *           ".write": "!data.exists() && auth != null"
 *         },
 *         "messages": {
 *           ".read":  "root.child('discussions').child($discussionId).child('meta').child('members').child(auth.uid).exists()",
 *           "$messageId": {
 *             ".write": "root.child('discussions').child($discussionId).child('meta').child('members').child(auth.uid).exists()",
 *             ".validate": "newData.hasChildren(['text','sender','timestamp'])
 *                           && newData.child('sender').val() === auth.uid
 *                           && newData.child('text').isString()
 *                           && newData.child('text').val().length <= 2000
 *                           && newData.child('timestamp').isNumber()
 *                           && newData.child('timestamp').val() <= now"
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

function loadMyDiscussions() {
  const myIdsRef = ref(db, `users/${currentUser.uid}/discussionIds`);

  onValue(myIdsRef, (snap) => {
    const ids = snap.exists() ? Object.values(snap.val()) : [];

    // Detach listeners for removed discussions
    Object.keys(discussionMetaListeners).forEach((id) => {
      if (!ids.includes(id)) {
        discussionMetaListeners[id]();
        delete discussionMetaListeners[id];
        delete discussions[id];
      }
    });

    // Attach listener per new discussion (meta only — no messages)
    ids.forEach((id) => {
      if (discussionMetaListeners[id]) return;

      const metaRef = ref(db, `discussions/${id}/meta`);
      const unsub = onValue(metaRef, (metaSnap) => {
        if (!metaSnap.exists()) return;
        const prev = discussions[id];
        discussions[id] = { id, ...metaSnap.val() };

        // Only re-render sidebar item, not the whole list
        if (prev) {
          updateSidebarItem(id);
        } else {
          appendSidebarItem(id);
        }
      });
      discussionMetaListeners[id] = unsub;
    });

    if (ids.length === 0) chatListEl.innerHTML = '';
  });
}

// ==================== SIDEBAR (no full re-render) ====================

/**
 * Append a single new item to the sidebar.
 * Never wipes the whole list — eliminates the flash.
 */
function appendSidebarItem(id) {
  const d = discussions[id];
  if (!d) return;

  const div = buildSidebarItem(id, d);
  chatListEl.appendChild(div);
}

/**
 * Update only the text/avatar of an existing sidebar item in place.
 */
function updateSidebarItem(id) {
  const d = discussions[id];
  if (!d) return;

  const existing = chatListEl.querySelector(`[data-disc-id="${id}"]`);
  if (!existing) {
    appendSidebarItem(id);
    return;
  }

  existing.querySelector('h4').textContent = d.name || 'Unnamed';
  existing.querySelector('span').textContent =
    Object.keys(d.members || {}).length + ' member(s)';
  existing.querySelector('img').src = d.avatar || 'https://i.pravatar.cc/42';
}

function buildSidebarItem(id, d) {
  const div = document.createElement('div');
  div.classList.add('chat-item');
  div.dataset.discId = id;
  div.innerHTML = `
    <img src="${d.avatar || 'https://i.pravatar.cc/42'}" />
    <h4>${sanitize(d.name || 'Unnamed')}</h4>
    <span>${Object.keys(d.members || {}).length} member(s)</span>
  `;
  div.addEventListener('click', () => selectDiscussion(id));
  return div;
}

// ==================== SELECT DISCUSSION ====================

function selectDiscussion(id) {
  // Detach previous message listener
  if (activeMessageUnsub) {
    activeMessageUnsub();
    activeMessageUnsub = null;
  }

  currentDiscussion = discussions[id];
  if (!currentDiscussion) return;

  // Update header — show names of OTHER members
  const memberUids = Object.keys(currentDiscussion.members || {});
  const otherNames = memberUids
    .filter((uid) => uid !== currentUser.uid)
    .map((uid) => usersCache[uid]?.name || usersCache[uid]?.email || uid)
    .join(', ');

  userNameEl.textContent =
    (currentDiscussion.name || 'Unnamed') + (otherNames ? ' — ' + otherNames : '');

  // Reset virtual scroll state
  teardownVirtualScroll();
  allMessages = [];
  renderStart = 0;
  renderEnd = 0;
  messagesEl.innerHTML = '';
  setupVirtualScroll();

  // Subscribe to messages in real-time
  const msgsRef = ref(db, `discussions/${id}/messages`);
  activeMessageUnsub = onValue(msgsRef, (snap) => {
    if (!snap.exists()) return;

    const incoming = Object.values(snap.val()).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Only process messages we don't already have (avoid full re-render)
    const existingCount = allMessages.length;
    const newMsgs = incoming.slice(existingCount);
    if (newMsgs.length === 0) return;

    const wasAtBottom = isScrolledToBottom();

    allMessages.push(...newMsgs);

    // If we're near the bottom, extend the render window downward
    if (wasAtBottom) {
      renderEnd = allMessages.length;
      renderStart = Math.max(0, renderEnd - BATCH);
      renderWindow();
      scrollToBottom();
    } else {
      // Just update spacers to account for new messages
      updateSpacers();
    }
  });
}

// ==================== VIRTUAL SCROLL ====================

function setupVirtualScroll() {
  spacerTop = document.createElement('div');
  spacerTop.className = 'spacer-top';
  spacerTop.style.height = '0px';

  spacerBottom = document.createElement('div');
  spacerBottom.className = 'spacer-bottom';
  spacerBottom.style.height = '0px';

  sentinelTop = document.createElement('div');
  sentinelTop.className = 'sentinel sentinel-top';

  sentinelBottom = document.createElement('div');
  sentinelBottom.className = 'sentinel sentinel-bottom';

  messagesEl.appendChild(spacerTop);
  messagesEl.appendChild(sentinelTop);
  messagesEl.appendChild(sentinelBottom);
  messagesEl.appendChild(spacerBottom);

  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === sentinelTop && renderStart > 0) {
          // Scroll up — render earlier messages
          const newStart = Math.max(0, renderStart - BATCH);
          renderStart = newStart;
          renderWindow();
        }

        if (entry.target === sentinelBottom && renderEnd < allMessages.length) {
          // Scroll down — render later messages
          const newEnd = Math.min(allMessages.length, renderEnd + BATCH);
          renderEnd = newEnd;
          renderWindow();
        }
      });
    },
    { root: messagesEl, threshold: 0.1 }
  );

  scrollObserver.observe(sentinelTop);
  scrollObserver.observe(sentinelBottom);
}

function teardownVirtualScroll() {
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }
  spacerTop = spacerBottom = sentinelTop = sentinelBottom = null;
}

/**
 * Re-render only the window [renderStart, renderEnd) of allMessages.
 * Nodes outside the window are removed; spacers fill the empty space.
 */
function renderWindow() {
  if (!spacerTop || !spacerBottom) return;

  // Remove all rendered message nodes (keep spacers and sentinels)
  const toRemove = messagesEl.querySelectorAll('.msg');
  toRemove.forEach((n) => n.remove());

  // Build a fragment for the window
  const frag = document.createDocumentFragment();
  for (let i = renderStart; i < renderEnd; i++) {
    const m = allMessages[i];
    const div = document.createElement('div');
    div.classList.add('msg', m.sender === currentUser.uid ? 'right' : 'left');
    div.textContent = sanitize(m.text);
    frag.appendChild(div);
  }

  // Insert between sentinels
  messagesEl.insertBefore(frag, sentinelBottom);

  updateSpacers();
}

function updateSpacers() {
  if (!spacerTop || !spacerBottom) return;
  spacerTop.style.height = renderStart * ROW_H + 'px';
  spacerBottom.style.height =
    Math.max(0, allMessages.length - renderEnd) * ROW_H + 'px';
}

function isScrolledToBottom() {
  if (!messagesEl) return true;
  return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 60;
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ==================== SEND MESSAGE ====================

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || !currentDiscussion) return;

  messageInput.value = '';

  const msgRef = push(ref(db, `discussions/${currentDiscussion.id}/messages`));
  await set(msgRef, {
    text: text.slice(0, 2000),
    sender: currentUser.uid,
    timestamp: Date.now(),
  });
}

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ==================== NEW DISCUSSION ====================

newDiscussionBtn.addEventListener('click', () => openNewDiscussionPopup('discussion'));
addFriendBtn.addEventListener('click', () => openNewDiscussionPopup('friend'));

function openNewDiscussionPopup(type) {
  selectedUsers = [];

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  const popup = document.createElement('div');
  popup.className = 'popup';

  const title = document.createElement('h3');
  title.textContent = type === 'discussion' ? 'New Discussion' : 'Add Friend';

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Discussion Name';
  if (type === 'friend') nameInput.style.display = 'none';

  const userInput = document.createElement('input');
  userInput.placeholder = 'Enter user email or name';

  const selectedDiv = document.createElement('div');
  selectedDiv.style.cssText = 'min-height:24px;display:flex;gap:6px;flex-wrap:wrap;';

  function addUserBox(user) {
    if (selectedUsers.find((u) => u.identifier === user.identifier)) return;
    selectedUsers.push(user);

    const span = document.createElement('span');
    span.style.cssText =
      'background:#eee;padding:2px 6px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;';
    span.textContent = user.name || user.identifier;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.cssText = 'border:none;background:transparent;cursor:pointer;';
    removeBtn.onclick = () => {
      selectedUsers = selectedUsers.filter((u) => u.identifier !== user.identifier);
      selectedDiv.removeChild(span);
    };

    span.appendChild(removeBtn);
    selectedDiv.appendChild(span);
  }

  userInput.addEventListener('keydown', async (e) => {
    if (e.key !== 'Enter' || !userInput.value.trim()) return;
    const inputVal = userInput.value.trim();

    if (inputVal.includes('@')) {
      addUserBox({ identifier: inputVal });
      userInput.value = '';
    } else {
      const users = searchUsers(inputVal);
      if (users.length > 0) {
        addUserBox({ identifier: users[0].email, name: users[0].name, uid: users[0].uid });
        userInput.value = '';
      } else {
        alert('User not found');
      }
    }
  });

  const btnsDiv = document.createElement('div');
  btnsDiv.className = 'popup-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancel';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = () => document.body.removeChild(overlay);

  const createBtn = document.createElement('button');
  createBtn.className = 'confirm';
  createBtn.textContent = 'Create';
  createBtn.onclick = async () => {
    if (selectedUsers.length === 0) return alert('Select at least one user');
    if (type === 'discussion' && !nameInput.value.trim())
      return alert('Enter discussion name');

    if (type === 'discussion') {
      // Resolve any email-only entries to uids
      const memberUids = await resolveToUids(selectedUsers);
      if (!memberUids) return; // unresolvable email

      // Build members map  { uid: true }
      const members = { [currentUser.uid]: true };
      memberUids.forEach((uid) => (members[uid] = true));

      const discRef = push(ref(db, 'discussions'));
      const newId = discRef.key;

      // Write meta (no messages node — saves bandwidth & prevents rule bypass)
      await set(ref(db, `discussions/${newId}/meta`), {
        name: nameInput.value.trim(),
        members,
        avatar: `https://i.pravatar.cc/42?u=${Date.now()}`,
        createdBy: currentUser.uid,
        createdAt: Date.now(),
      });

      // Write discussion id into every member's index
      await Promise.all(
        Object.keys(members).map((uid) =>
          set(ref(db, `users/${uid}/discussionIds/${newId}`), newId)
        )
      );
    } else if (type === 'friend') {
      const userFriendsRef = ref(db, `users/${currentUser.uid}/friends`);
      const snap = await get(userFriendsRef);
      const existing = snap.exists() ? snap.val() : [];
      const newFriends = selectedUsers
        .map((u) => u.identifier)
        .filter((id) => !existing.includes(id));
      await set(userFriendsRef, [...existing, ...newFriends]);
    }

    document.body.removeChild(overlay);
  };

  btnsDiv.appendChild(cancelBtn);
  btnsDiv.appendChild(createBtn);
  popup.appendChild(title);
  popup.appendChild(nameInput);
  popup.appendChild(userInput);
  popup.appendChild(selectedDiv);
  popup.appendChild(btnsDiv);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
  userInput.focus();
}

/**
 * For selected users that were added by email (no uid yet), look them up in
 * the cache or fetch from DB.  Returns array of uids, or null if any email
 * is unresolvable.
 */
async function resolveToUids(users) {
  const uids = [];
  for (const u of users) {
    if (u.uid) {
      uids.push(u.uid);
      continue;
    }
    // Look up by email
    const match = Object.values(usersCache).find(
      (c) => c.email === u.identifier
    );
    if (match) {
      uids.push(match.uid);
    } else {
      alert(`User not found: ${u.identifier}`);
      return null;
    }
  }
  return uids;
}

// ==================== INIT ====================

setTimeout(() => {
  document.getElementById('loading').remove();
  document.getElementById('app').classList.remove('hidden');
}, 1000);