var newroom = new URLSearchParams(window.location.search);
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, push, query,child, orderByChild } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

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

if (newroom.has("invite")) {
    var invites = query(ref(db, 'invites'));
    var inviteId = newroom.get("invite")
    var userinfo = {
        email:localStorage.getItem("email"),
        name:localStorage.getItem("name")
    }
    console.log(invites)
}

// create invite and give link to user
function createInvite(allowedUser,cusid) {
    if (allowedUser == undefined) {
        return false
    }
    var id = push(child(ref(database), 'invites')).key;
    console.log("[invite] Sending...")
    var userinfo = {
        email:localStorage.getItem("email"),
        name:localStorage.getItem("name")
    }
    // adding invite to the database
    set(ref(database, "invites/" + id), {
        email: userinfo.email,
        name: userinfo.name,
        allowed: allowedUser,
        date: Date.now(),
        dname: cusid
    })
    // return the url for invite to send
    return "chat.geoloup.com/chat?invite=" + id
}

window.createInvite = createInvite