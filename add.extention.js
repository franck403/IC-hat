if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}

export function add(name,url) {
    if (url.search("https://") == -1) {
        var old = localStorage.getItem("extention")
        localStorage.setItem("extention", old +  "gcode.custom2" + name + "gcode.custom3" + url).replaceAll('"','gcode.custom1')
        return true
    } else {
        var old = localStorage.getItem("extention")
        localStorage.setItem("extention", old +  "," + name + ";" + url)
    }
    window.location.replace("https://" + window.location.host)
}

export function check() {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        if (main != "") {
            var act2 = main.split(";")
            var act3 = document.querySelectorAll('[data-name="' + act2[0] +'"]')[0]
            act3.setAttribute("class","store_box store-added")
        } else{}

    });
}