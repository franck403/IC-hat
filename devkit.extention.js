export const OnNewMessage = {
    code : "",
    lauch : function() {    
        let lauch = ""
        lauch = this.code
        lauch(data)
    },
    setup_code : function(name,code) {
        this.code = code
    },
    OnMessage : function(val) {
        var CodeToLauch = this.code
        console.log(CodeToLauch)
        this.LauchCode(CodeToLauch,val)
    }
}


