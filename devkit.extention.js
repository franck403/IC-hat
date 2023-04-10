export function OnNewMessage(name,code) {
    this.code,
    this.lauch = function () {    
        let lauch = ""
        lauch = this.code
        lauch(data)
    },
    this.setup_code = function (name,code) {
        this.code = code
    }
    /*
    var strcode = code
    localStorage.setItem("devkit_" + name, strcode)
    var CodeToLauchList = localStorage.getItem("devkit")
    localStorage.setItem("devkit",CodeToLauchList + "|__|" + name)
    */
    this.chiladd = function OnMessage(val) {
        if (localStorage.getItem("devkit") != null) {
            var CodeToLauchListNotSplit = localStorage.getItem("devkit")
            var CodeToLauchList = CodeToLauchListNotSplit.split("|__|")
            CodeToLauchList.forEach(function(name){
                if (name != "null") {
                    var CodeToLauch = localStorage.getItem("devkit_" + name)
                    console.log(CodeToLauch)
                    LauchCode(CodeToLauch,val)
                } else {}
            }); 
        } else {}
    }
}


