import {setCookie,getCookie} from "./bhuy3huygyufwyuge.js"
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
  document.getElementById("not-connected").remove()
  document.getElementById("wait-connected").remove()
}
else {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
}

export function add_type(type_name,type_code) {
    var cusid = document.getElementsByClassName('people-person active')[0].id
    const id = push(child(ref(database), 'extention_type')).key;
    set(ref(database, 'extention_type/'+ cusid + '/' + id), {
        code: type_code,
        add_type:type_name,
    });
    var old1 = localStorage.getItem("control_extention")
    localStorage.setItem("control_extention",old1 + "," + type_name)
    localStorage.setItem(type_name,type_code)
}

export function get_type() {
    return localStorage.getItem("control_extention")
}