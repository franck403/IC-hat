var url = window.location.href;

if (url.endsWith("#")) {
  url = url.slice(0, -1)
}
url = url.split("?")[0];
console.log('[room] checking url')
if (url == "https://chat.geoloup.com/chat") {
  window.location.replace("https://ic-hat.geoloup.com/chat")
}
if (url == "https://chat.geoloup.com/") {
  window.location.replace("https://ic-hat.geoloup.com/")
}
if (url == "https://chat.geoloup.com") {
  window.location.replace("https://ic-hat.geoloup.com/store")
}
console.log('[room] room was loaded')


let max = 0
function load_image(chat_id) {
  var main = document.getElementById("room_" + chat_id)
  var images = document.getElementsByClassName(`img-load-${chat_id}`)
  let data = []
  let min = 0
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
          image.src = image.dataset.src
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
function room(id, e) {
  try {
    if (e.target.parentElement.parentElement.classList.contains('people-setting') || e.target.parentElement.classList.contains('people-setting') || e.target.classList.contains('people-setting') || e.target.classList.contains('fa-ellipsis')) {
      console.log('setting menu was clicked aborting ...')
      return;
    }
  } catch {}
  if (id == "geoloup_chat") {
    var new2 = document.getElementById(id + "_c")
  } else if (id.search("new") != -1) {
    var research = id.replace("new", "")
    window.createDisc(research)
    document.getElementById('search_bar').value = ""
    search()
    var new2 = document.getElementById("room_" + research)
    var id = research
    console.log('new diccusion')
  } else {
    var new2 = document.getElementById("room_" + id)
  }

  localStorage.setItem("lastChat", id)
  var old1 = document.getElementsByClassName("write")[0].setAttribute("class", "write write-active")
  var old2 = document.getElementsByClassName("chat active-chat")[0]
  var old4 = document.getElementsByClassName("mobile")[0].setAttribute("class", "mobile mobile-active")
  var old5 = document.getElementsByClassName("mobile-frame")[0].setAttribute("class", "mobile-frame mobile-frame-active")
  var listener = function () {
    load_image(localStorage.getItem("lastChat"))
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
  setTimeout(load_image,1000,id)
}

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
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        console.log(ev.dataTransfer.files)
        var imageTypes = [
          'image/png',
          'image/gif',
          'image/bmp',
          'image/jpeg',
          'image/webp',
          'image/svg+xml',
          'audio/mpeg',   // .mp3
          'audio/wav',    // .wav
          'audio/ogg',    // .ogg
          'audio/mp4',    // .m4a
          'audio/x-ms-wma'// .wma
        ];
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

        if (key.val().name.toUpperCase().indexOf(document.getElementById('search_bar').value.toUpperCase()) > -1) {
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
    var f = (responseJson) => {
      let z = document.getElementsByClassName('people-person db');
      for (i = 0; i < z.length; i++) {
        z[i].remove()
      }

      var list = responseJson
      Object.keys(list).forEach(keyid => {
        var key = window.userdb[keyid]

        if (key.val().name.toUpperCase().indexOf(document.getElementById('search_bar').value.toUpperCase()) > 2) {
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
        } else {}
        document.getElementById('search_bar').removeAttribute("disable")
      })
    }
    f(window.userdb)
    console.log("[search core] Searching Person in friend...")
  }
}


function Openurl(link) {
  window.open(link);
}

function big(elem) {
  document.getElementById('big-image').classList.toggle('big-image')
  document.getElementById('big-image').style.cssText = `--image:url('${elem.dataset.src}')`
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
  var isVisible = (elemTop >= -50) && (elemBottom <= window.innerHeight);
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

// show message setting
function showSetting(el) {


  var message = el.parentElement
  // with the element create and display the html
  // add eventllisner to det3ect click away etc to make it automacly posse
  // options = [[name,func],[name,func]] etc
}




function autocomplete(inp) {
  var arr = []
  window.userdb.forEach((element) => {
    arr.push(element.val().email)
    arr.push(element.val().name)
  })
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
setTimeout(() => {
  autocomplete(document.getElementById("friend_email"));
}, 10000);