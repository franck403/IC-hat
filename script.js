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


var myName = prompt("Enter your name");


const send = document.getElementById("content");
send.addEventListener('click', (e) => {
    var name = myName;
    var message = document.getElementById("content")
    const id = push(child(ref(database), 'messages')).key;

    set(ref(database, 'messages/' + id), {
        name: name,
        message: message
    });
    document.getElementById('content').value = "";
});

const newMsg = ref(database, 'messages/');
onChildAdded(newMsg, (data) => {
    if(data.val().name != myName) {
        var html = `<div class="bubble you">${ data.val().message }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.insertAdjacentHTML('chat', html);
    }else{
        var html = `<div class="bubble me">${ data.val().message }</div>`
        var d1 = document.getElementById('bodyContent');
        d1.insertAdjacentHTML('chat', html);
    }
});

var initApp = function() {
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    user.getIdToken().then(function(accessToken) {});
    } else {
        window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/login");
    }
}, function(error) {
    console.log(error);
});
};

window.addEventListener('load', function() {
initApp()
});
