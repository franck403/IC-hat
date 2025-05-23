var newroom = new URLSearchParams(window.location.search);
import { initializeApp } from "./supbase.js";
import { getDatabase, ref, get, child, update, onChildAdded } from "./supbase.js";

const firebaseConfig = {
    apiKey: atob("QUl6YVN5RDlwbzdsLXZ3TzBWclkxck1ZREZUWU5sRUJ2NTRUNmRv"),
    authDomain: "ic-hat.firebaseapp.com",
    databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
    projectId: "ic-hat",
    storageBucket: "ic-hat.appspot.com",
    messagingSenderId: "720687529085",
    appId: "1:720687529085:web:2d964e880c5e2398058514",
    measurementId: "G-YC8K0D7GLR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

if (newroom.has("invite")) {
    onChildAdded(ref(database, 'invites/'), async (data2) => {
        // check the good id from the url
        var inviteId = newroom.get("invite")
        if (data2.val().inviteid == inviteId) {
            // good invite show message
            console.log('got invite')
            controlInvte(data2)
        }
    })
}

function controlInvte(snapshot) {
    console.log('Starting invite')
    const dbRef = ref(database);
    console.log(snapshot.val().dname)
    const friend_invite = ref(database, 'users_friend/');
    onChildAdded(friend_invite, (data) => {
        if (snapshot.val().dname == data.val().dname) {
            const style = document.createElement("link")
            link.href = "https://ic-hat.geoloup.com/invite.css"
            link.rel = "stylesheet"
            document.head.appendChild(style)
            var script = `
            import { initializeApp } from "./supbase.js";
            import { getDatabase, ref, get, child, update, onChildAdded } from "./supbase.js";

            const firebaseConfig = {
                apiKey: atob("QUl6YVN5RDlwbzdsLXZ3TzBWclkxck1ZREZUWU5sRUJ2NTRUNmRv"),
                authDomain: "ic-hat.firebaseapp.com",
                databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
                projectId: "ic-hat",
                storageBucket: "ic-hat.appspot.com",
                messagingSenderId: "720687529085",
                appId: "1:720687529085:web:2d964e880c5e2398058514",
                measurementId: "G-YC8K0D7GLR"
            };

            const app = initializeApp(firebaseConfig);
            const database = getDatabase(app);

            function accept(val) {
                InviteChange(val)
            }
            window.accept = accept
            function InviteChange(id) {
                // query data to change
                const dbRef = ref(database);
                get(child(dbRef, ` + "`users_friend/${id}/}`" + `)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot)
                        const allowValue = snapshot.val();
                        const dbRef = ref(getDatabase())
                        const updates = {};
                        console.log(allowValue)
                        updates[` + "`users_friend/${id}/allow`" + `] = allowValue.allow;
                        update(dbRef, updates);
                    } else {
                    console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });      
            }`
            document.body.innerHTML = `<div><h1>Do you want to join a disccusion with</h1><h2>${snapshot.val().allow}</h2><button onclick="window.accept(${snapshot.val().dname})">Acccept invite</button><script type="module">${script}</script></div>`
        }
    })
}