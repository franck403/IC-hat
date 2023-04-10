import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'


OnNewMessage.setup_code("consolelog",(data) => {
    console.log("Hello World !" + data)
})