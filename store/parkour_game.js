import {SendMessage} from '.././message.extention.js'
import {OnNewMessage} from '.././devkit.extention.js'

OnNewMessage.setup_code("consolelog",(data) => {
    console.log("type : " + data.type + "\n message : " + data.message)
})

var log_out = document.getElementById("log-out")
log_out.addEventListener('click', (e) => {
    SendMessage("devkit_test","devkit_test","TEST")
});

