import {setCookie,getCookie} from "https://splendorous-hamster-ecd34b.netlify.app/bhuy3huygyufwyuge.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

if (getCookie("ready") != null) {
    var myEmail = getCookie("email")
    var myName = getCookie("email")
} else {}

export function SendMessage(ext_name,ext_type,content) {
    var str = content;
    var message = str;
    var name = myName;
    var cusid = document.getElementsByClassName('people-person active')[0].id
    const id = push(child(ref(database), 'messages/' + cusid)).key;
    set(ref(database, 'messages/'+ id), {
        email:name,
        type:ext_type,
        message: message,
        date: Date.now()
    });
}