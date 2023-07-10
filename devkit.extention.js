export const OnNewMessage = {
    code : [],
    LauchCode : function(data) {    
        let lauchs = ""
        lauchs = OnNewMessage.code
        lauchs.forEach(lauch => {
            if (lauch != null) {
                try {
                lauch(data)
                } catch {}
            } else {}            
        });
    },
    setup_code : function(code) {
        OnNewMessage.code.push(code)
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
    OnNewMessage.setup_code((data) => {
        console.log("message recive = " + data.message)
    })
    `
}