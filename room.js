function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById(id + "_c")
    } else if (id.search("new") != -1) {
      var research = id.replace("new","")
      document.getElementById("friend_email").value = research
      document.getElementById("new_friend_add").click()
      document.getElementById('search_bar').value = ""
      search()
      var new2 = document.getElementById("room_" + research)
    } else {
      var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("write")[0].setAttribute("class","write write-active")
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var old4 = document.getElementsByClassName("mobile")[0].setAttribute("class","mobile mobile-active")
    var old5 = document.getElementsByClassName("mobile-frame")[0].setAttribute("class","mobile-frame mobile-frame-active")
    var old6 = document.getElementsByClassName("left left-active")[0].setAttribute("class","left")
    var old7 = document.getElementsByClassName("top")[0].setAttribute("class","top top-active")
    var new1 = document.getElementById(id)
    var new1 = document.getElementById(id)
    var to = document.querySelector("#to")
    try {
        old2.setAttribute("class","chat")
    } catch {}
    new2.setAttribute("class","chat active-chat")
    to.innerHTML = new1.dataset.name
    new2.scrollTop = new2.scrollHeight;
    new2.scrollTop = new2.scrollHeight; 
}
// spam counter
var send_by_img = document.getElementById("send")
var send_by_enter = document.getElementById("content")
// spam database
var spam_database = {
    spam_counter : 0,
    spam_max : 5
}
// spam code
let spam_event = (spam_database) => {
    spam_database.spam_counter = spam_database.spam_counter + 1
    if (spam_database == spam_database.spam_counter) {
        document.getElementById("content").setAttribute("disable","true")
    } else {
        document.getElementById("content").removeAttribute("disable")
    }
}
// spam listener
send_by_img.addEventListener('click', spam_event(spam_database));
send_by_enter.addEventListener('click', spam_event(spam_database));


function mobile() {
  var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class","write")
  var old2 = document.getElementsByClassName("chat active-chat")[0].setAttribute("class","chat")
  var old4 = document.getElementsByClassName("mobile mobile-active")[0].setAttribute("class","mobile")
  var old5 = document.getElementsByClassName("mobile-frame mobile-frame-active")[0].setAttribute("class","mobile-frame")
  var old6 = document.getElementsByClassName("left")[0].setAttribute("class","left left-active")
  var old7 = document.getElementsByClassName("top top-active")[0].setAttribute("class","top")
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
              var d  = ev.dataTransfer.files
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
	input=input.toLowerCase();
	let x = document.getElementsByClassName('people-person');
	
	for (i = 0; i < x.length; i++) {
    if (!x[i].classList.contains("db")) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
      }
      else {
        x[i].style.display="list-item";				
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
    fetch('https://auth.francoischouin1.repl.co/user/search?name=' + input)
      .then((response)=>response.json())
      .then((responseJson)=>{
        for (i = 0; i < z.length; i++) {
          z[i].remove()
        }    
        document.getElementById('search_bar').removeAttribute("disable")
        var list = responseJson
        Object.keys(list).forEach(key => {
          var db_name = list[key]
          var db_name = db_name["email"]
          var html = `
          <li onclick="room('new${db_name}')" class="people-person db" data-name="" data-d-chat="" id="">
          <img src="img/default.png" class="people-img"alt="picture" />
          <p id="name_" class="people-name">${db_name}</p>
          <p id="time_" class="people-time"></p>
          <p id="prew_" class="people-preview"></p>
          </li>`
          const d2 = document.getElementById("people")
          d2.innerHTML = d2.innerHTML + html
        });
      });
  } else {
    console.log("[search core] Searching Person in friend...")
  }
}

