import {SendMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/message.extention.js'
import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'

OnNewMessage.setup_code("consolelog",(data) => {
    console.log("type : " + data.type + " message : " + data.message)
})

var log_out = document.getElementById("log-out")
log_out.addEventListener('click', (e) => {
    SendMessage("devkit_test","devkit_test","TEST")
});
