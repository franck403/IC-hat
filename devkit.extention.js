export function OnNewMessage(name,code) {
    var strcode = code.toString()
    localStorage.setItem("devkit_" + name, strcode)
    var CodeToLauchList = localStorage.getItem("devkit")
    localStorage.setItem("devkit",CodeToLauchList + "|__|" + name)
}

export function LauchCode(code,data) {
    setTimeout(code, 1,data)
}

export function OnMessage(val) {
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
