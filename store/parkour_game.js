import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'

var message = (data) => {
    console.log("[devkit send a message]")
    console.log(data)
}
OnNewMessage("consolelog",message)