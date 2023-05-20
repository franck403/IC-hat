fetch("https://fireimage.francoischouin1.repl.co/", {
    method: "GET"
})
.catch((error) => {
    fetch("https://fireimage.francoischouin1.repl.co/", {
        method: "GET",
        mode:"no-cors"
    })
    .catch((error) => {
        window.location.replace("https://" + window.location.host)
    });
});

fetch("https://auth.francoischouin1.repl.co/", {
    method: "GET"
})
.catch((error) => {
    fetch("https://auth.francoischouin1.repl.co/", {
        method: "GET",
        mode:"no-cors"
    })
    .catch((error) => {
        window.location.replace("https://" + window.location.host)
    });
});

import {setCookie,getCookie,delCookie,decrypt,removeloader,getuser,message_date} from "./bhuy3huygyufwyuge.js"
import {OnNewMessage} from "./devkit.extention.js"
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

var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData == null){
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData.search("<title>500 Internal Server Error</title>") != -1) {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else {
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
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('friend_email').value != "" && fg.replace(/\s/g, '').length != 0) {
        var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
        var before_friend = document.getElementById("friend_email").value + "," + myEmail
        var after_friend = before_friend.split(",")
        var endfriend =[]
        after_friend.forEach(item => {
            if (item.search("@" != -1)) {
                endfriend.push(item)
            }
        });
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
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
        var str = document.getElementById('content').value;
        var str1 = str.replaceAll("<","&lt;")
        var str2 = str1.replaceAll(">","&gt;")
        var message = str2;
        var name = myEmail;
        const id = push(child(ref(database), 'messages')).key;
        var friend = "none"
        var cusid = document.getElementsByClassName('chat active-chat')[0].id
        set(ref(database, 'messages/'+ cusid + '/' + id), {
            email:name,
            allow:friend,
            message: message,
            type:"message",
            name:myName,
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
            var name = myEmail;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('chat active-chat')[0].id
            set(ref(database, 'messages/'+ cusid + '/' + id), {
                email:name,
                allow:friend,
                type:"message",
                message: message,
                name:myName,
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
        var name = myEmail;
        const id = push(child(ref(database), 'messages')).key;
        var cusid = document.getElementsByClassName('chat active-chat')[0].id
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
        var n_allow = data.val().allow
        try {
            var new_allow = n_allow.join(",")
            var nwe_allow = new_allow.replace(myEmail,"")
            var nw_allow = nwe_allow.replaceAll(","," ")
        } catch {
            var nw_allow = n_allow
        }
        var html = `
        <li onclick="room('${data.val().dname}')" class="people-person" data-name="${data.val().allow}" data-d-chat="${data.val().dname}" id="${data.val().dname}">
        <img src="img/default.png" class="people-img"alt="picture" />
        <p id="name_${data.val().allow}" class="people-name">${nw_allow}</p>
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
            if (data2.val().name != null) {
            if (data2.val().message != null) {
                if (data2.val().type == "message") {
                    if (data2.val().name != null) {
                        if(data2.val().email == myEmail) {
                            var html = `<div class="bubble me">${ data2.val().message }</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }else{
                            var html = `<div class="bubble you"><div class="bubble-name">${ data2.val().name }</div><div>${ data2.val().message }</div></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else {}
                } else if (data2.val().type == "image") {
                        if(data2.val().email == myEmail) {
                            var html = `<div class="bubble me"><img class="type-img" src="${data2.val().message}"></img></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  "image"
                        }else{
                            var html = `<div class="bubble you"><div class="bubble-name">${ data2.val().name }</div><div><img class="type-img" src="${data2.val().message}"></img></div></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  'image'
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                } else if(data2.val().type == "new-encrypted") {
                    try {
                        if(data2.val().email == myEmail) {
                            var message = decrypt(data2.val().message)
                            var html = `<div class="bubble me" id="${data2.val().date}">${message}</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  message
                        }else{
                            var message = decrypt(data2.val().message)
                            var html = `<div class="bubble you"><div class="bubble-name">${ data2.val().name }</div><div>${ message }</div></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  message
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } catch {}
                } else if (data2.val().tpye == "message") {
                    if (data2.val().name != null) {
                        if(data2.val().name == myName) {
                            var html = `<div class="bubble me">${ data2.val().message }</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }else{
                            var html = `<div class="bubble you"><div class="bubble-name">${ data2.val().name }</div><div>${ data2.val().message }</div></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else {}
                } else if (data2.val().type == null) {
                    if (data2.val().name != null) {
                        if(data2.val().name == myName) {
                            var html = `<div class="bubble me">${ data2.val().message }</div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }else{
                            var html = `<div class="bubble you"><div class="bubble-name">${ data2.val().name }</div><div>${ data2.val().message }</div></div>`
                            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                            var DateNow = data2.val().date
                            var date = message_date(DateNow)
                            d1.innerHTML = d1.innerHTML + html
                            document.getElementById(`time_${dnamef}`).innerHTML =  date
                            document.getElementById(`prew_${dnamef}`).innerHTML =  data2.val().message
                        }
                        var elem = document.querySelector(`[data-chat="${dnamef}"]`);
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else {}
                } else if (data2.val().type == "message") {
                } else if (data2.val().type == "encrypted") {
                } else {
                    OnNewMessage.OnMessage(data2.val())
                }
                //bip()
            }
            else {}
        }
        });
    } else{}    
});

removeloader()
} catch {}