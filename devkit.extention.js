export function OnNewMessage(name,code) {
    var onmess = code
    localStorage.setItem("devkit_" + name, code.toString)
    var CodeToLauchList = localStorage.getItem("devkit")
    localStorage.setItem("devkit",CodeToLauchList + "|__|" + name)
    return path
}

export function LauchCode(code) {
    return setTimeout(code, 0)
}

export function OnMessage(val) {
    if (localStorage.getItem("devkit") != null) {
        var CodeToLauchListNotSplit = localStorage.getItem("devkit")
        var CodeToLauchList = CodeToLauchListNotSplit.split("|__|")
        CodeToLauchList.forEach(function(name){
            var CodeToLauch = localStorage.getItem("devkit_" + name)
            LauchCode(CodeToLauch)
        }); 
    } else {}
}
