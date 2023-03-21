function room(id){
    if (id == "geoloup_chat") {
        var new2 = document.getElementById("room_" + id + "_c")        
    } else {
        var new2 = document.getElementById("room_" + id)
    }
    var old1 = document.getElementsByClassName("person active")[0]
    var old2 = document.getElementsByClassName("chat active-chat")[0]
    var new1 = document.getElementById(id)
    old1.setattribute("class","person")
    old2.setattribute("class","chat")
    new1.setattribute("class","person active")
    new2.setattribute("class","chat active-chat")
}