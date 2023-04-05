export function load() {
    try {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        var act2 = main.split(";")
        var script1 = document.getElementById("extention_import").innerHTML
        document.getElementById("extention_import").innerHTML = script1 + "<script src='" + act2[1] + "'" + "></script>"
    });
    return true
    } catch {
        return null
    }
}