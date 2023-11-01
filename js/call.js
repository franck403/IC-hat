import { setCookie, getCookie, delCookie, decrypt, bip, removeloader, getuser, message_date, message_render } from "./bhuy3huygyufwyuge.js"
import { OnNewMessage } from "./devkit.extention.js"
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded,
    onChildChanged
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

var app = window.appFire
var database = window.databaseFire

const friend_invite = ref(database, database, 'preload/' + cusid + '/Message');
onChildAdded(friend_invite, (data) => {})

/*
    email: myEmail,
    allow: friend,
    type: "message",
    message: message_render(message, "nop"),
    name: myName,
    date: Date.now(),
    dname: cusid
*/

function receive(message) {
    var d = new URLSearchParams(message)
    console.log(d.get("type"))
    console.log(d.get("uuid"))
    if (d.get("type") == "call" && localStorage.getObj("roomlist").indexof(d.get("room"))) {
        document.getElementById("Calling").dataset.uuid = d.get("uuid")
        document.getElementById("UserNameCall").innerText = d.get("name")
        openModal()
    }

}

function Send(message) {
    if (message.replace(/\s/g, "") != "") {
        socket.emit("send", message);
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

function StartCall() {
    Send(`?f&type=call&uuid=${uuidv4()}&name=${localStorage.getItem("name")}&`)
}