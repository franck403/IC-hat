console.log("-----------------------------");

var keys = localStorage.getItem("name");

if (keys != null) {}
else {window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/");}

console.log("-----------------------------");
console.log("finish generating the session");
console.log("-----------------------------");


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
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
const analytics = getAnalytics(app);
const database = getDatabase(app);

var myName = "test"


const send = document.getElementById("send");
const send2 = document.getElementById("content");

send.addEventListener('click', (e) => {
    var name = myName;
    var message = document.getElementById("content")
    var friend = "none"
    const id = push(child(ref(database), 'messages')).key;

    set(ref(database, 'messages/' + id), {
        name: name,
        allow:friend,
        message: message.value
    });
    document.getElementById('content').value = "";
});
send2.addEventListener("keydown", (e) => {
    if (event.keyCode == 13) {
        if (document.getElementById('content').value != "") {
            var name = myName;
            var message = document.getElementById("content")
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"

            set(ref(database, 'messages/' + id), {
                name: name,
                allow:friend,
                message: message.value
            });
            document.getElementById('content').value = "";
        } else {}
    } else {}
});

const newMsg = ref(database, 'messages/');
onChildAdded(newMsg, (data) => {
    if(data.val().name != myName) {
        var html = `<div class="bubble you">${ data.val().message }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.innerHTML = d1.innerHTML + html
    }else{
        var html = `<div class="bubble me">${ data.val().message }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.innerHTML = d1.innerHTML + html
    }
});