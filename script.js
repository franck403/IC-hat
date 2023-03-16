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


var myName = prompt("Enter your name");

function send() {
    var message = document.getElementById("content")
    html = `<div class="bubble me">${ message.value }</div>`
    const id = push(child(ref(database), 'messages')).key;

    set(ref(database, 'messages/' + id), {
        name: name,
        message: message
    });
    document.getElementById('content').value = "";

}


const newMsg = ref(database, 'messages/');
onChildAdded(newMsg, (data) => {
    if(data.val().name != myName) {
        mes = data.val().message
        html = `<div class="bubble you">${ mes }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.insertAdjacentHTML('chat', html);
    }else{
        mes = data.val().message
        html = `<div class="bubble me">${ mes }</div>`
        var d1 = document.getElementById('bodyContent');
        d1.insertAdjacentHTML('chat', html);
    }
});