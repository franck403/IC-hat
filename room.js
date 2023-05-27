function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById(id + "_c")
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("write")[0].setAttribute("class","write write-active")
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    
    var old4 = document.getElementsByClassName("mobile")[0].setAttribute("class","mobile mobile-active")
    var old5 = document.getElementsByClassName("mobile-frame")[0].setAttribute("class","mobile-frame mobile-frame-active")
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
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="list-item";				
		}
	}
  if (x[i].style.display == "none") {

  }
}

