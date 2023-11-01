import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

var app = window.appFire
var database = window.databaseFire


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
        document.getElementById("UserNameCall").innerText = d.get("name")
        openModal()
    }

}

window.receive = receive

function StartCall() {
    var myName = localStorage.getItem("name")
    var cusid = localStorage.getItem("lastChat")
    set(ref(database, 'preload/' + cusid + '/Message'), {
        type: "call",
        uuid: uuidv4(),
        name: myName,
    })
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