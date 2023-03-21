function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById("room_" + id + "_c")        
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("person active")[0]
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var new1 = document.getElementById(id)
    old1.attribute("class","person")
    old2.attribute("class","chat")
    new1.attribute("class","person active")
    new2.attribute("class","chat active-chat")
}