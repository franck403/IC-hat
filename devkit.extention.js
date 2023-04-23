export const OnNewMessage = {
    code : "",
    LauchCode : function(data) {    
        let lauch = ""
        lauch = OnNewMessage.code
        if (lauch != null) {
            try {
            lauch(data)
            } catch {}
        } else {}
    },
    setup_code : function(name,code) {
        OnNewMessage.code = code
    },
    OnMessage : function(val) {
        var CodeToLauch =  OnNewMessage.code
        OnNewMessage.LauchCode(val)
    }
}

export const docs = {
    help : 
    `import {OnNewMessage} from '../.devkit.extention.js'
    // note the type supported by the core are not send 
    OnNewMessage.setup_code("code name",(data) => {
        console.log("message recive = " + data.message)
    })
    `
}