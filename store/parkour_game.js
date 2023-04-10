import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'

function message() {
    console.log("[devkit send a message]")
}
OnNewMessage("consolelog",message)