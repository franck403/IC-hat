export const OnNewMessage = {
    code : "",
    LauchCode : function() {    
        let lauch = ""
        lauch = OnNewMessage.code
        lauch(data)
    },
    setup_code : function(name,code) {
        OnNewMessage.code = code
    },
    OnMessage : function(val) {
        var CodeToLauch =  OnNewMessage.code
        console.log(CodeToLauch)
        OnNewMessage.LauchCode(CodeToLauch,val)
    }
}

export const docs = {
    help : 
    `import {OnNewMessage} from 'https://splendorous-hamster-ecd34b.netlify.app/devkit.extention.js'

    OnNewMessage.setup_code("code name",(data) => {
        console.log("message recive = " + data.message)
    })
    `
}