function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById("room_" + id + "_c")        
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("person active")[0]
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var new1 = document.getElementById(id)
    var to = document.querySelector("#to")
    console.log(new1)
    old1.setAttribute("class","person")
    old2.setAttribute("class","chat")
    new1.setAttribute("class","person active")
    new2.setAttribute("class","chat active-chat")
    to.innerHTML = new1.dataset.name
}