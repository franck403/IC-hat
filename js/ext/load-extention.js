import { setCookie, getCookie, delCookie, decrypt, bip, removeloader, getuser, message_date, message_render } from "../../functions.js"
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
localStorage.setItem("state", "no")
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

const library = ref(database, 'extention/lib/');
onChildAdded(library, (data) => {
    var val = data.val()
    console.log(val)
    var content = val.content.replaceAll('"','gcode.custom1')
    var extName = val.name
    var description = val.description
    var creator = val.user_name
    var email = val.email
    var elem = `   
    <div class="store_box" data-name="${extName}" onclick="(() => {if (this.dataset.content != undefined) {;add(this.dataset.name,this.dataset.content);return true}})()" data-content="${content}" id="add_extention">
        <img class="store_img" src="img/ic-hat.png"></img>
        <button class="store_button">${extName}</button>
    </div>
    `
    document.getElementById("store").innerHTML = document.getElementById("store").innerHTML + elem
});