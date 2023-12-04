var newroom = new URLSearchParams(window.location.search);
import { getDatabase, ref, query, orderByChild } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
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

const database = getDatabase(window.appFire);

// getting database and querying info about invite
const db = getDatabase();

if (dnamef == newroom.get("invite") && newroom.has("invite")) {
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
    console.log("[image render] Sending...")
    var userinfo = {
        email:localStorage.getItem("email"),
        name:localStorage.getItem("name")
    }
    set(ref(database, "invites/" + cusid + "/" + id), {
        email: userinfo.email,
        name: userinfo.name,
        allowed: allowedUser,
        date: Date.now(),
        dname: cusid
    })
    return "chat.geoloup.com/chat?invite=" + id
}

window.createInvite = createInvite