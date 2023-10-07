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
    val = data.val()
    content = val.content
    extName = val.name
    description = val.description
    creator = val.user_name
    email = val.emai
    `   
    <div class="store-2 store_box" data-name="${extName}" data-content="${content}" id="add_extention">
        <img class="store_img" src="img/ic-hat.png"></img>
        <button class="store_button">Add crypt message</button>
    </div>
    `
    console.log(val)
});