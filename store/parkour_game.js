import {SendMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/message.extention.js'
import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'

SendMessage("TEST")

OnNewMessage.setup_code("consolelog",(data) => {
    console.log("type : " + data.type + " message : " + data.message)
})