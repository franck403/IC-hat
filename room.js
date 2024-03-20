var url = window.location.href;

if (url.endsWith("#")) {
  url = url.slice(0, -1)
}
url = url.split("?")[0];
if (url == "https://chat.geoloup.com/chat") {
  window.location.replace("https://ic-hat.geoloup.com/chat")
}
if (url == "https://chat.geoloup.com/") {
  window.location.replace("https://ic-hat.geoloup.com/")
}
if (url == "https://chat.geoloup.com") {
  window.location.replace("https://ic-hat.geoloup.com/store")
}


let max = 0
function load_image(chat_id, min_) {
  var main = document.getElementById("room_" + chat_id)
  var images = document.getElementsByClassName(`img-load-${chat_id}`)
  let data = []
  let min = min_
  let calc = 0
  if (images.length == 0) {
    return
  }
  for (i = 0; i < images.length; i++) {
    var image = images[i]
    if (image.dataset.state != "load") {
      data.push(image)
    }
  }
  data.reverse()
  for (i = 0; i < data.length; i++) {
    var image = images[i]
    if (image.dataset.state != "load") {
      if (isScrolledIntoView(image)) {
        try {
          image.src = "data:image/" + image.dataset.src
          image.dataset.state = "load"
        } catch {
          image.remove()
        }
      }
      calc = calc + 1
    }
  };
  return true
}
function room(id) {
  if (id == "geoloup_chat") {
    var new2 = document.getElementById(id + "_c")
  } else if (id.search("new") != -1) {
    var research = id.replace("new", "")
    document.getElementById("friend_emails").value = research
    document.getElementById("new_friend_add").click()
    document.getElementById('search_bar').value = ""
    var new2 = document.getElementById("room_" + research)
  } else {
    var new2 = document.getElementById("room_" + id)
  }
  localStorage.setItem("lastChat", id)
  var old1 = document.getElementsByClassName("write")[0].setAttribute("class", "write write-active")
  var old2 = document.getElementsByClassName("chat active-chat")[0]
  var old4 = document.getElementsByClassName("mobile")[0].setAttribute("class", "mobile mobile-active")
  var old5 = document.getElementsByClassName("mobile-frame")[0].setAttribute("class", "mobile-frame mobile-frame-active")
  var listener = function () {
    load_image(localStorage.getItem("lastChat"), 0)
  };
  //window.MessageLoad(window.processingMessage.indexOf(toString(id)),0)
  new2.addEventListener('scroll', listener, false);

  try {
    var old6 = document.getElementsByClassName("left left-active")[0].setAttribute("class", "left")
    var old7 = document.getElementsByClassName("top")[1].setAttribute("class", "top top-active")
  } catch {

  }
  var new1 = document.getElementById("d" + id)
  var new1 = document.getElementById("d" + id)
  var to = document.querySelector("#to")
  try {
    old2.setAttribute("class", "chat")
  } catch { }
  new2.setAttribute("class", "chat active-chat")
  to.innerHTML = new1.dataset.name
  new2.scrollTop = new2.scrollHeight;
  new2.scrollTop = new2.scrollHeight;
  load_image(id, 0, 10)
  history.pushState("disscusion change", "IC-hat - By GL team", `/chat`);
}
// spam counter
var send_by_img = document.getElementById("send")
var send_by_enter = document.getElementById("content")
// spam database
var spam_database = {
  spam_counter: 0,
  spam_max: 5
}
// spam code
let spam_event = (spam_database) => {
  spam_database.spam_counter = spam_database.spam_counter + 1
  if (spam_database == spam_database.spam_counter) {
    document.getElementById("content").setAttribute("disable", "true")
  } else {
    document.getElementById("content").removeAttribute("disable")
  }
}
// spam listener
send_by_img.addEventListener('click', spam_event(spam_database));
send_by_enter.addEventListener('click', spam_event(spam_database));

// automaticlly load discussion

function mobile() {
  var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class", "write")
  var old2 = document.getElementsByClassName("chat active-chat")[0].setAttribute("class", "chat")
  var old4 = document.getElementsByClassName("mobile mobile-active")[0].setAttribute("class", "mobile")
  var old5 = document.getElementsByClassName("mobile-frame mobile-frame-active")[0].setAttribute("class", "mobile-frame")
  var old6 = document.getElementsByClassName("left")[0].setAttribute("class", "left left-active")
  try {
    var old7 = document.getElementsByClassName("top top-active")[1].setAttribute("class", "top")
  } catch {

  }
}

function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        console.log(ev.dataTransfer.files)
        var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpeg'];
        if (imageTypes.includes(item.type) != 0) {
          const file = item.getAsFile();
          document.getElementById("file_input").files = ev.dataTransfer.files;
          console.log(`${item.type}… file[${i}].name = ${file.name}`);
        }
        else {
          var d = ev.dataTransfer.files
          console.log(d)
        }
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function search() {
  let input = document.getElementById('search_bar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('people-person');

  for (i = 0; i < x.length; i++) {
    if (!x[i].classList.contains("db")) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
      }
      else {
        x[i].style.display = "list-item";
      }
    }
  }
  let x_test = 0
  let x_need = Object.keys(x).length
  for (i = 0; i < x.length; i++) {
    if (x[i].style.display == "none") {
      x_test++
    }
    if (x[i].classList.contains("db")) {
      x[i].remove()
      x_test++
    }
  }
  if (x_test == x_need) {
    let z = document.getElementsByClassName('people-person db');
    for (i = 0; i < z.length; i++) {
      z[i].remove()
    }
    console.log("[search core] Searching Person in db...")
    document.getElementById('search_bar').disabled
    var f = (responseJson) => {
      for (i = 0; i < z.length; i++) {
        z[i].remove()
      }

      var list = responseJson
      Object.keys(list).forEach(keyid => {
        console.log(key)
        var key = window.userdb[keyid]
        
        if (key.val().name.toUpperCase().indexOf(document.getElementById('search_bar').valuetoUpperCase()) > -1) {
          var db_name = key.val().name
          var db_email = key.val().email
          var html = `
                      <li onclick="room('new${db_email}')" class="people-person db" data-name="" data-chatid="" id="">
                      <img src="img/default.png" class="people-img"alt="picture" />
                      <p id="name_" class="people-name">${db_name}</p>
                      <p id="time_" class="people-time"></p>
                      <p id="prew_" class="people-preview"></p>
                      </li>`
          const d2 = document.getElementById("people")
          d2.innerHTML = d2.innerHTML + html  
        } else {
          console.log('user does not fit search...' + key.val().name)
        }
        document.getElementById('search_bar').removeAttribute("disable")
      })
    }
    f(window.userdb)
  } else {
    console.log("[search core] Searching Person in friend...")
  }
}


function Openurl(link) {
  window.open(link);
}


function big(elem) {
  elem.classList.toggle("big-image")

}
function key_add() {
  search()
}
function friend(email) {
  if (!document.getElementById("friend-preview-" + email).classList.contains("check")) {
    document.getElementById("friend-preview-" + email).classList.toggle('check');
  } else {
    document.getElementById("friend-preview-" + email).classList.toggle('check');
  }
}

var modal = document.getElementById("Calling");

function openModal(text, type) {
  modal.style.display = "flex";
  document.getElementById("Calling").dataset.type = type
  if (text != null) {
    document.getElementById("UserNameText").innerText = text
  }
}
function refuseCall() {
  modal.style.display = "none";
}
function acceptCall() {
  console.log("Login to call...")
  window.open("https://testnode.virusgaming1.repl.co/room/" + document.getElementById("Calling").dataset.uuid + "?name=Gilaxy04")
  console.log("Call started!")
  modal.style.display = "none";
}
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    refuseCall();
  }
});
var phoneButton = document.querySelector(".phone-button-call");
phoneButton.style.backgroundRepeat = "no-repeat";
phoneButton.style.backgroundPosition = "center";
var xButton = document.querySelector(".x-button-call");
xButton.style.backgroundRepeat = "no-repeat";
xButton.style.backgroundPosition = "12px 8px";

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

function time_fresh() {
  try {
    var list = document.getElementsByClassName("people-person")
    Object.keys(list).forEach(id => {
      var el = list[id]
      var elt = document.getElementById("time_" + el.dataset.chatid)
      try {
        var elf = parseFloat(elt.dataset.send)
        elt.innerHTML = message_date(elf, el.dataset.chatid)
      } catch {
        // nothing for now
      }
    });
  } catch {
    // when user is new or his account was recreated
  }
  clearTimeout(window.lastId)
  window.lastId = setTimeout(time_fresh, 1000);
}

window.lastId = setTimeout(time_fresh, 30000);