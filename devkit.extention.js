export function OnNewMessage(path,code) {
    var onmess = code
    localStorage.setItem("devkit_" + path, code)
    return path
}

export function LauchCode(code) {
    return setTimeout(code, 0)
}

export function OnMessage(path) {
    var CodeToLauch = localStorage.getItem("devkit_" + path)
    LauchCode(CodeToLauch)
}
