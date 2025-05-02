import {setCookie,getCookie} from ".././functions.js"
import { initializeApp } from "./supbase.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "./supbase.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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
    set(ref(database, 'messages/'+ cusid + "/" + id), {
        email:name,
        type:ext_type,
        message: message,
        date: Date.now()
    });
}

export function SendCustomMessage(ext_name,ext_type,ext_content) {
    var str = ext_content;
    var message = str;
    const id = push(child(ref(database), 'extention/')).key;
    set(ref(database, 'extention/' + id), {
        ext_name:ext_name,
        ext_type:ext_type,
        ext_code: message,
    });
}