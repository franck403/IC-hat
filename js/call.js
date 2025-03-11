import { initializeApp } from "./supbase.js";
import {
    getDatabase,
    set,
    ref
} from "./supbase.js";
localStorage.setItem("state", "no")
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

/*
    email: myEmail,
    allow: friend,
    type: "message",
    message: message_render(message, "nop"),
    name: myName,
    date: Date.now(),
    dname: cusid
*/

/*
    type: "call",
    uuid: uuidv4(),
    name: myName,
*/

function receive(message) {
    var d = new URLSearchParams(message)
    console.log(d.get("type"))
    console.log(d.get("uuid"))
    if (d.get("type") == "call") {
        document.getElementById("Calling").dataset.uuid = d.get("uuid")
        document.getElementById("Calling").dataset.type = "type"
        document.getElementById("UserNameCall").innerText = d.get("name")
        openModal()
    }

}

window.receive = receive

function StartCall() {
    var myName = localStorage.getItem("name")
    var cusid = localStorage.getItem("lastChat")
    var myEmail = localStorage.getItem("email")
    var friend = null
    set(ref(database, 'preload/' + cusid + '/Message'), {
        email: myEmail,
        allow: friend,
        type: "call",
        message: uuidv4(),
        name: myName,
        date: Date.now(),
        dname: cusid
    });
}

window.StartCall = StartCall

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}