function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById(id + "_c")
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("write")[0].setAttribute("class","write write-active")
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var old3 = document.getElementsByClassName("top")[1].setAttribute("class","top top-active")
    var old4 = document.getElementsByClassName("mobile")[0].setAttribute("class","mobile mobile-active")
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
// spam code
let spam_event = () => {}
// spam listener
send_by_img.addEventListener('click', spam_event);
send_by_enter.addEventListener('click', spam_event);


function mobile() {
    var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class","write")
    var old2 = document.getElementsByClassName("chat active-chat")[0].setAttribute("class","chat")
    var old3 = document.getElementsByClassName("top")[1].setAttribute("class","top")
    var old4 = document.getElementsByClassName("mobile mobile-ative")[0].setAttribute("class","mobile")
}