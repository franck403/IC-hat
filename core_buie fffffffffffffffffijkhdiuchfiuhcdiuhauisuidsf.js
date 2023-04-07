localStorage.setItem("wait",1)
localStorage.setItem("mainwait",1)

fetch("https://fireimage.francoischouin1.repl.co/", {
    method: "GET"
})
.catch((error) => {
    // window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/")
});
fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/", {
    method: "GET"
})
.catch((error) => {
    // window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/")
});

import {setCookie,getCookie,delCookie,cryptmess} from "./bhuy3huygyufwyuge.js"
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
try {
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
            email:name,
            allow:friend,
            message: message,
            type:"message",
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
                email:name,
                allow:friend,
                type:"message",
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
            email: name,
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
        var html = `
        <li onclick="room('${data.val().dname}')" class="people-person" data-name="${data.val().allow}" data-d-chat="${data.val().dname}" id="${data.val().dname}">
        <img src="default.png" class="people-img"alt="picture" />
        <p id="name_${data.val().allow}" class="people-name">${data.val().allow}</p>
        <p id="time_${data.val().dname}" class="people-time"></p>
        <p id="prew_${data.val().dname}" class="people-preview"></p>
        </li>`
        // chat_el_box
        var html_chat = `
        <div class="chat" id="room_${data.val().dname}" data-chat="${data.val().dname}">
        <span></span>
        </div>`
        const d1 = document.getElementById("chat_el_box")
        const d2 = document.getElementById("people")
        d1.innerHTML = d1.innerHTML + html_chat
        d2.innerHTML = d2.innerHTML + html
        const dnamef = data.val().dname
        var romc = ref(database, `messages/${dnamef}`);
        onChildAdded(romc, (data2) => {
            if (data2.val().message != null) {
                if (data2.val().type == "message") {
                    if (data2.val().name == null) {
                        if(data2.val().email == myEmail) {
                            var html = `<div class="bubble me">${ data2.val().message }</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var dateConvert = new Date(DateNow)
                            var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }else{
                            var html = `<div class="bubble you">${ data2.val().message }</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var dateConvert = new Date(DateNow)
                            var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else {}
                } else if (data2.val().type == "image") {
                    if (data2.val().name == null) {
                        if(data2.val().email == myEmail) {
                            var html = `<div class="bubble me"><img class="type-img" src="${data2.val().message}"></img></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var dateConvert = new Date(DateNow)
                            var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  "image"
                        }else{
                            var html = `<div class="bubble you"><img class="type-img" src="${data2.val().message}"></img></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var dateConvert = new Date(DateNow)
                            var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  'image'
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else {}
                } else if(data2.val().type == "encrypted") {
                    if(data2.val().email == myEmail) {
                        var html = `<div class="bubble me" id="${data2.val().date}">loading</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        var DateNow = data2.val().date
                        var dateConvert = new Date(DateNow)
                        var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  ""
                    }else{
                        var html = `<div class="bubble you" style="display: none;" id="${data2.val().date}">loading</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        var DateNow = data2.val().date
                        var dateConvert = new Date(DateNow)
                        var date = dateConvert.getHours() + ":" + dateConvert.getMinutes()
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML =  date
                        document.getElementById(`prew_${dnamef}`).innerHTML =  ""
                    }
                    var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                    elem.scrollTop = elem.scrollHeight;
                    elem.scrollTop = elem.scrollHeight;
                    /*
                    fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/uncrypt?text=" + data2.val().message, {method: "GET"})
                    .then((response) => response.text())
                    .then((data) => {
                        document.getElementById(data2.val().date).innerHTML = data
                        if (data == "loading") {
                        document.getElementById(data2.val().date).setAttribute("style","display:none;")
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                        } else {
                            document.getElementById(data2.val().date).setAttribute("style","display:block;")
                            var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                            elem.scrollTop = elem.scrollHeight;
                            elem.scrollTop = elem.scrollHeight;
                        }
                        document.getElementById(`prew_${dnamef}`).innerHTML =  data
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    })
                    .catch((error) => {
                        document.getElementById(data2.val().date).setAttribute("style","display:none;")
                    });
                    */
                    var stim = localStorage.getItem("wait")
                    var stim2 = localStorage.getItem("mainwait")
                    setTimeout(cryptmess(data2.val().message,data2),stim)
                    localStorage.setItem("wait",stim + 10000)
                    localStorage.setItem("mainwait",stim2 + 1)
                    var stim2 = localStorage.getItem("mainwait")
                    document.getElementById("load_rest").innerHTML = `loading | ${stim2} message loaded`
                } else {}
            }
            else {}
        });
    }else{}    
});


var log_out = document.getElementById("log_out")
log_out.addEventListener('click', (e) => {
    delCookie("ready")
    delCookie("myEmail")
    window.location.reload()
});

document.getElementById("loader").remove();
document.getElementById("loader_box").remove()
} catch {}