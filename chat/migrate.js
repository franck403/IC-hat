import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import { getDatabase, ref, get, set } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js';

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
const db = getDatabase(app);

async function migrate() {
  // 1. Read all old discussions
  const discSnap = await get(ref(db, 'discussions'));
  if (!discSnap.exists()) return console.log('No discussions found');
  const allDiscs = discSnap.val();

  // 2. Read all users (to resolve emails -> uids)
  const usersSnap = await get(ref(db, 'users'));
  const allUsers = usersSnap.exists() ? usersSnap.val() : {};
  
  // Build email -> uid map
  const emailToUid = {};
  Object.values(allUsers).forEach(u => { emailToUid[u.email] = u.uid; });

  for (const [id, disc] of Object.entries(allDiscs)) {
    // Skip already migrated (has meta subnode)
    if (disc.meta) {
      console.log(`Skipping already migrated: ${id}`);
      continue;
    }

    console.log(`Migrating: ${disc.name} (${id})`);

    // Resolve email array to { uid: true } members map
    const members = {};
    const emails = disc.users || [];
    for (const email of emails) {
      const uid = emailToUid[email];
      if (uid) {
        members[uid] = true;
      } else {
        console.warn(`  Could not resolve email: ${email} — skipping`);
      }
    }

    if (Object.keys(members).length === 0) {
      console.warn(`  No resolvable members for ${id}, skipping`);
      continue;
    }

    // Write meta node
    await set(ref(db, `discussions/${id}/meta`), {
      name: disc.name || 'Unnamed',
      members,
      avatar: disc.avatar || `https://i.pravatar.cc/42?u=${id}`,
      createdBy: Object.keys(members)[0],
      createdAt: Date.now(),
    });

    // Write discussionIds index for each member
    for (const uid of Object.keys(members)) {
      await set(ref(db, `users/${uid}/discussionIds/${id}`), id);
    }

    console.log(`  ✓ Migrated with members: ${Object.keys(members).join(', ')}`);
  }

  console.log('Migration complete!');
}

migrate();