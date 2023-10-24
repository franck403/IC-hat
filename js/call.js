window.onload = function(name,id) {
    var socket = eval(`window.socket${id}`)
    socket = io("https://staticlimemonad.virusgaming1.repl.co");
    var usernameInput = name
    var chatRoom = id
    socket.on("join", function(room) {})

    socket.on("recieve", function(message) {
        var d = new URLSearchParams(message)
        console.log(d.get("type"))
        console.log(d.get("uuid"))
        if (d.get("type") == "call") {
            document.getElementById("Calling").dataset.uuid = d.get("uuid")
            document.getElementById("UserNameCall").innerText = d.get("name")
            openModal()
        }
    })
    socket.emit("join", chatRoom, usernameInput);
}


function Send(message) {
    if (message.replace(/\s/g, "") != "") {
        eval(`window.socket${localStorage.getITem("lastChat")}.emit("send", message);`)
    }
}

function uuidv4() { 
    return 'xyxxyxxx-xxxx-4xxx-yxxx-xyxxxxxyxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}

function StartCall() {
    Send(`?f&type=call&uuid=${uuidv4()}&name=gilaxy05`)
}