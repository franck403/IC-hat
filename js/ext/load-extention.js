import { setCookie, getCookie, delCookie, decrypt, bip, removeloader, getuser, message_date, message_render, time_fresh } from "../../bhuy3huygyufwyuge.js"
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