import { setCookie, getCookie, delCookie, decrypt, bip, removeloader, getuser, message_date, message_render, time_fresh } from "https://chat.geoloup.com/bhuy3huygyufwyuge.js"
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

var myData = await getuser()
if (myData != null) {
    var myEmail = myData.email
    var myName = myData.user_metadata.full_name
    setCookie("email", myEmail)
    setCookie("name", myName)
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
    window.location.replace(window.location.origin)
}

const library = ref(database, 'extention/lib/');
onChildAdded(library, (data) => {
    val = data.val()
    content = val.content
    extName = val.name
    description = val.description
    creator = val.user_name
    email = val.email
    console.log(val)
});