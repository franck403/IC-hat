import { getCookie, getuser } from "./bhuy3huygyufwyuge.js"
export function load() {
    try {
        var ext = localStorage.getItem("extention")
        var act = ext.split("gcode.custom2")
        act.forEach((main) => {
            if (main != "" && getCookie("geoloup") != null) {
                var act2 = main.split("gcode.custom3")
                var tag = document.createElement("script");
                if (act2[1].search("https://") == -1) {
                    var blob = new Blob([act2.replaceAll('"','gcode.custom1')], {type: "text/plain"});
                    act2[1]= window.URL.createObjectURL(blob);
                }
                tag.src = act2[1];
                tag.type = "module"
                document.getElementById("extention_import").appendChild(tag);
                console.log("[extention loader] " + act2[1] + " loaded")
            } else { }

        });
        var tag = document.createElement("script");
        tag.src = "core.js";
        tag.type = "module"
        document.getElementById("extention_import").appendChild(tag);
        var tag = document.createElement("script");
        tag.src = "js/call.js";
        tag.type = "module"
        document.getElementById("extention_import").appendChild(tag);
        return true
    } catch {
        return null
    }
}