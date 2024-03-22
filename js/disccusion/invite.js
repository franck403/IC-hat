var newroom = new URLSearchParams(window.location.search);
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, query,update ,onChildAdded} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
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

function InviteChange(id) {
    // query data to change

    ref(`users_friend/${id}/allow`).once('value')
    .then((snapshot) => {
        console.log(allowValue);
        const allowValue = snapshot.val();
        const dbRef = ref(getDatabase())
        const updates = {};
        updates[`users_friend/${id}/allow`] = allowValue;
        update(dbRef, updates);
    })
    .catch((error) => {
        console.error(error);
    });
}


if (newroom.has("invite")) {
    console.log('got invite')
    onChildAdded(ref(database, 'invites/'), async (data2) => {
        var value = data2.val()
        // check the good id from the url
        var inviteId = newroom.get("invite")
        console.log(value.inviteid)
        console.log(inviteId)
        console.log('-----------')
        if (value.inviteid == inviteId) {
            // good invite show message
            console.log('got invite')
            InviteChange(inviteId)
        }
    })    
}

