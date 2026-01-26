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
  query,
  orderByChild,
  startAt,
  endAt,
  child,
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
let currentDiscussion = null;
let discussions = {};
let usersCache = {};
let selectedUsers = [];

// ==================== AUTH STATE ====================
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '/'; // redirect to login page
  } else {
    currentUser = user;
    userNameEl.textContent = user.displayName || user.email;
    statusMessageEl.textContent = 'Online';
    ensureUserInDB();
    loadDiscussionsRealtime();
    loadUsersRealtime();
  }
});

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

// ==================== HELPERS ====================

function addMessage(msg, side = 'left') {
  const div = document.createElement('div');
  div.classList.add('msg', side);
  div.textContent = msg.text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ==================== USERS ====================

// Ensure current user exists in DB
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

// Load all users in real-time
function loadUsersRealtime() {
  const usersRef = ref(db, 'users');
  onValue(usersRef, (snap) => {
    usersCache = snap.exists() ? snap.val() : {};
  });
}

// Search users by name/email
function searchUsers(queryText) {
  if (!queryText) return [];
  const q = queryText.toLowerCase().trim();
  return Object.values(usersCache).filter(
    (u) =>
      u.uid !== currentUser.uid &&
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase() === q)
  );
}

// ==================== DISCUSSIONS ====================

// Load discussions in real-time
function loadDiscussionsRealtime() {
  const discussionsRef = ref(db, 'discussions');
  onValue(discussionsRef, (snap) => {
    discussions = snap.exists() ? snap.val() : {};
    renderDiscussionList();
    if (currentDiscussion && discussions[currentDiscussion.id]) {
      selectDiscussion(currentDiscussion.id);
    }
  });
}

// Render sidebar discussions
function renderDiscussionList() {
  chatListEl.innerHTML = '';
  Object.entries(discussions).forEach(([id, d]) => {
    if (!d.users.includes(currentUser.email)) return; // show only user's discussions
    const div = document.createElement('div');
    div.classList.add('chat-item');
    div.innerHTML = `
      <img src="${d.avatar || 'https://i.pravatar.cc/42'}" />
      <h4>${d.name}</h4>
      <span>${d.users.length} user(s)</span>
    `;
    div.onclick = () => selectDiscussion(id);
    chatListEl.appendChild(div);
  });
}

// Select discussion
function selectDiscussion(id) {
  currentDiscussion = { id, ...discussions[id] };
  userNameEl.textContent = currentDiscussion.name;
  messagesEl.innerHTML = '';
  if (currentDiscussion.messages) {
    Object.values(currentDiscussion.messages)
      .sort((a, b) => a.timestamp - b.timestamp)
      .forEach((m) => {
        addMessage(m, m.sender === currentUser.uid ? 'right' : 'left');
      });
  }
}

async function sendMessageUnder() {
  if (!messageInput.value || !currentDiscussion) return;
  const msgRef = push(ref(db, `discussions/${currentDiscussion.id}/messages`));
  const msg = {
    text: messageInput.value,
    sender: currentUser.uid,
    timestamp: Date.now(),
  };
  await set(msgRef, msg);
  messageInput.value = '';
}

// also send message
messageInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // prevent new line
    sendMessageUnder();
  }
});

// Send message
sendBtn.addEventListener('click', async () => {
  sendMessageUnder();
});

// ==================== NEW DISCUSSION ====================
newDiscussionBtn.addEventListener('click', () =>
  openNewDiscussionPopup('discussion')
);

addFriendBtn.addEventListener('click', () => openNewDiscussionPopup('friend'));

function openNewDiscussionPopup(type) {
  selectedUsers = []; // stores { name/email, uid/email }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  // Create popup box
  const popup = document.createElement('div');
  popup.className = 'popup';

  // Title
  const title = document.createElement('h3');
  title.textContent = type === 'discussion' ? 'New Discussion' : 'Add Friend';

  // Discussion name input (only for discussion)
  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Discussion Name';
  if (type === 'friend') nameInput.style.display = 'none';

  // User input (email or name search)
  const userInput = document.createElement('input');
  userInput.placeholder = 'Enter user email or name';

  // Container for selected users/emails
  const selectedDiv = document.createElement('div');
  selectedDiv.style.minHeight = '24px';
  selectedDiv.style.display = 'flex';
  selectedDiv.style.gap = '6px';
  selectedDiv.style.flexWrap = 'wrap';

  // Helper to add a user/email box
  function addUserBox(user) {
    if (selectedUsers.find((u) => u.identifier === user.identifier)) return;

    selectedUsers.push(user);

    const span = document.createElement('span');
    span.textContent = user.name || user.identifier;
    span.style.background = '#eee';
    span.style.padding = '2px 6px';
    span.style.borderRadius = '6px';
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.style.gap = '4px';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.style.border = 'none';
    removeBtn.style.background = 'transparent';
    removeBtn.style.cursor = 'pointer';
    removeBtn.onclick = () => {
      selectedUsers = selectedUsers.filter(
        (u) => u.identifier !== user.identifier
      );
      selectedDiv.removeChild(span);
    };

    span.appendChild(removeBtn);
    selectedDiv.appendChild(span);
  }

  // Handle Enter key to add user
  userInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && userInput.value.trim()) {
      const inputVal = userInput.value.trim();

      // If it's an email format, just add it
      if (inputVal.includes('@')) {
        addUserBox({ identifier: inputVal });
        userInput.value = '';
      } else {
        // Search by name in Firebase DB
        const users = searchUsers(inputVal); // returns [{uid, name, email}]
        if (users.length > 0) {
          addUserBox({
            identifier: users[0].email,
            name: users[0].name,
            uid: users[0].uid,
          });
          userInput.value = '';
        } else {
          alert('User not found');
        }
      }
    }
  });

  // Buttons
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
    if (type === 'discussion' && !nameInput.value)
      return alert('Enter discussion name');

    if (type === 'discussion') {
      const discRef = push(ref(db, 'discussions'));
      const discussion = {
        name: nameInput.value,
        users: [currentUser.email, ...selectedUsers.map((u) => u.identifier)],
        messages: {},
        avatar: `https://i.pravatar.cc/42?u=${Date.now()}`,
      };
      await set(discRef, discussion);
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

  // Assemble popup
  popup.appendChild(title);
  popup.appendChild(nameInput);
  popup.appendChild(userInput);
  popup.appendChild(selectedDiv);
  popup.appendChild(btnsDiv);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  userInput.focus();
}

setTimeout(() => {
  document.getElementById('loading').remove();
  document.getElementById('app').classList.remove('hidden')
}, 1000);
