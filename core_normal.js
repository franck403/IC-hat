function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=https://auth.geoloup.com/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

localStorage.setItem("count",0)
var keys = getCookie("name");
if (keys != null) {document.getElementById("not-connected").remove()}
else {document.getElementById("connected").remove()}

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

var myName = localStorage.getItem("name")
var myEmail = localStorage.getItem("email")


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

// Get the modal
var modal2 = document.getElementById("file");

// Get the button that opens the modal
var btn2 = document.getElementById("add_file");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

friends.addEventListener('click', (e) => {
    var fg = document.getElementById('friend_email').value
    console.log(fg.replace(/\s/g, '').length)
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('friend_email').value != "" && fg.replace(/\s/g, '').length != 0) {
        var customid1 = String(Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random()+Math.random())
        var customid = customid1.replace(".","")
        var before_friend = document.getElementById("friend_email").value + "," + localStorage.getItem("email")
        var after_friend = before_friend.split(",")
        var endfriend = after_friend
        var data = {
            allow:endfriend,
            dname:customid
        }
        set(ref(database, 'messages/' + customid + "/"), data);
        set(ref(database, 'users_friend/' + customid), data);
        document.getElementById('friend_email').value = "";
        modal.style.display = "none";
    } else {}
});

send.addEventListener('click', (e) => {
    var fg = document.getElementById('content').value
    console.log(fg.replace(/\s/g, '').length)
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
        var str = document.getElementById('content').value;
        var str1 = str.replaceAll("<","&lt;")
        var str2 = str1.replaceAll(">","&gt;")
        var message = str2;
        var name = myName;
        const id = push(child(ref(database), 'messages')).key;
        var friend = "none"
        var cusid = document.getElementsByClassName('people-person active')[0].id
        set(ref(database, 'messages/'+ cusid + '/' + id), {
            name: name,
            allow:friend,
            message: message,
            tpye:"message",
            date:Date.now(),
            dname:cusid
        });
        document.getElementById('content').value = "";
    } else {}
});
send2.addEventListener("keydown", (e) => {
    if (event.keyCode == 13) {
        var fg = document.getElementById('content').value
        var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
            var str = document.getElementById('content').value;
            var str1 = str.replaceAll("<","&lt;")
            var str2 = str1.replaceAll(">","&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('people-person active')[0].id
            set(ref(database, 'messages/'+ cusid + '/' + id), {
                name: name,
                allow:friend,
                tpye:"message",
                message: message,
                date: Date.now(),
                dname: cusid
            });
            document.getElementById('content').value = "";
        } else {}
    } else {}
});

var add_file = document.getElementById("add_image")
add_file.addEventListener('click', (e) => {
    const formData = new FormData();
    
    const fileField = document.getElementById("file_input").files[0]
    formData.append('file', fileField)
    var storageId = document.getElementsByClassName('active').id
    var url;
    fetch("https://fireimage.francoischouin1.repl.co/success", {
        method: "POST",
        body: formData
    })
    .then((response) => response.text())
    .then((data) => {
        var url = data
        var name = myName;
        const id = push(child(ref(database), 'messages')).key;
        var cusid = document.getElementsByClassName('person active')[0].id
        set(ref(database, "messages/"+ cusid + "/" + id), {
            name: name,
            friend:"none",
            type:"image",
            message: url,
            date:Date.now(),
            dname:cusid
        });    
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    document.getElementById("file").style.display = "none";
    document.getElementById("file_input").value = "";

});

const form  = document.getElementById('add_image');

form.addEventListener('submit', (event) => {
    event.preventDefault();
});

const friend_invite = ref(database, 'users_friend/');
onChildAdded(friend_invite, (data) => {
    var dte = data.val().allow
    if(dte.indexOf(myEmail) != -1) {
        if (localStorage.getItem("count") == 0) {var class2 = "people-person active";var class3 = "chat chat-active"} else {var class2 = "people-person";var class3= "chat"}
        localStorage.setItem("count",localStorage.getItem + 1)    
        var html = `
        <li onclick="room('${data.val().dname}')" class="${class2}" data-name="${data.val().allow}" data-d-chat="${data.val().dname}" id="${data.val().dname}">
        <img src="default.png" class="people-img"alt="picture" />
        <p id="name_${data.val().allow}" class="people-name">${data.val().allow}</p>
        <p id="time_${data.val().dname}" class="people-time"></p>
        <p id="prew_${data.val().dname}" class="people-preview"></p>
        </li>`
        // chat_el_box
        var html_chat = `
        <div class="${class3}" id="room_${data.val().dname}" data-chat="${data.val().dname}">
        <span></span>
        </div>`
        if (localStorage.getItem("count") == 1) {var class2 = "people-person active";var new1 = document.getElementById(id);var to = document.querySelector("#to");to.innerHTML = new1.dataset.name;var class3 = "chat chat-active"} else {}
        const d1 = document.getElementById("chat_el_box")
        const d2 = document.getElementById("people")
        d1.innerHTML = d1.innerHTML + html_chat
        d2.innerHTML = d2.innerHTML + html
        const dnamef = data.val().dname
        var romc = ref(database, `messages/${dnamef}`);
        onChildAdded(romc, (data2) => {
            if (data2.val().message != null) {
                if (data2.val().type != "image") {
                    if(data2.val().name != myName) {
                        var html = `<div class="bubble you">${ data2.val().message }</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  data2.val().date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                    }else{
                        var html = `<div class="bubble me">${ data2.val().message }</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  data2.val().date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                    }
                    var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
                } else {
                    if(data2.val().name != myName) {
                        var html = `<div class="bubble you"><img class="type-img" src="${data2.val().message}"></img></div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  data2.val().date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  "image"
                    }else{
                        var html = `<div class="bubble me"><img class="type-img" src="${data2.val().message}"></img></div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  data2.val().date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  'image'
                    }
                    var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
        
                }
            }
            else {
                console.log("type non supported")
            }
            
        });
    }else{}
    
});

const load_check = ref(database, 'load/');
onChildAdded(load_check, (data) => {
    document.getElementById("loader").remove();
    document.getElementById("loader_box").remove()
})
