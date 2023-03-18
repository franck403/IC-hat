console.log("-----------------------------");

var keys = localStorage.getItem("name");

if (keys != null) {}
else {window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/login");}

console.log("-----------------------------");
console.log("finish generating the session");
console.log("-----------------------------");


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
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
const analytics = getAnalytics(app);
const database = getDatabase(app);

var myName = localStorage.getItem("name")

var friendhtml = `
<li class="person" data-d-chat="person1">
<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg" alt="" />
<span class="name">Thomas Bangalter</span>
<span class="time">2:09 PM</span>
<span class="preview">I was wondering...</span>
</li>`

const send = document.getElementById("send");
const send2 = document.getElementById("content");
const friends = document.getElementById("new_friend_add");

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("new_friend");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
friends.addEventListener('click', (e) => {
    var fg = document.getElementById('content').value
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('friend_email').value != "" || fg.find(gh) != -1) {
        var customid1 = String(Math.random())
        console.log(customid1)
        var customid = customid1.replace(".","")
        var friends = [document.getElementById("friend_email").value,localStorage.getItem("email")]
        set(ref(database, 'messages/' + customid + "/"), {allow:friends});
        var data = {
            allow:friends
        }
        child('users/' + localStorage.getItem("uid")).update(data)
        document.getElementById('content').value = "";
    } else {}
});

send.addEventListener('click', (e) => {
    var fg = document.getElementById('content').value
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('content').value != "" || fg.find(gh) != -1) {
        var str = document.getElementById('content').value;
        var str1 = str.replaceAll("<","&lt;")
        var str2 = str1.replaceAll(">","&gt;")
        var message = str2;
        var name = myName;
        const id = push(child(ref(database), 'messages')).key;
        var friend = "none"

        set(ref(database, 'messages/geoloup_chat/' + id), {
            name: name,
            allow:friend,
            message: message,
            date:Date.now()
        });
        document.getElementById('content').value = "";
    } else {}
});
send2.addEventListener("keydown", (e) => {
    if (event.keyCode == 13) {
        var fg = document.getElementById('content').value
        var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        if (document.getElementById('content').value != "" || fg.find(gh) != -1) {
            var str = document.getElementById('content').value;
            var str1 = str.replaceAll("<","&lt;")
            var str2 = str1.replaceAll(">","&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"

            set(ref(database, 'messages/geoloup_chat/' + id), {
                name: name,
                allow:friend,
                message: message,
                date: Date.now()
            });
            document.getElementById('content').value = "";
        } else {}
    } else {}
});

const newMsg = ref(database, 'messages/geoloup_chat/');
onChildAdded(newMsg, (data) => {
    if(data.val().name != myName) {
        var html = `<div class="bubble you">${ data.val().message }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.innerHTML = d1.innerHTML + html
        document.getElementById("time").innerHTML =  data.val().date
        document.getElementById("prew").innerHTML =  data.val().message
    }else{
        var html = `<div class="bubble me">${ data.val().message }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.innerHTML = d1.innerHTML + html
        document.getElementById("time").innerHTML =  data.val().date
        document.getElementById("prew").innerHTML =  data.val().message
    }
    var elem = document.querySelector('[data-chat="person1"]');
    elem.scrollTop = elem.scrollHeight;
    elem.scrollTop = elem.scrollHeight;
});

var elem = document.querySelector('[data-chat="person1"]');
elem.scrollTop = elem.scrollHeight;
elem.scrollTop = elem.scrollHeight;




document.getElementById("loader").remove();
document.getElementById("loader_box").remove();