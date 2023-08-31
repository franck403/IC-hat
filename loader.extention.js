import { getCookie, getuser } from "./bhuy3huygyufwyuge.js"
export function load() {
    try {
        var ext = localStorage.getItem("extention")
        var act = ext.split(",")
        act.forEach((main) => {
            if (main != "" && getCookie("geoloup") != null) {
                var act2 = main.split(";")
                fetch(act2[1], { method: "GET" })
                    .then((response) => response.text())
                    .then((data) => {
                        var tag = document.createElement("script");
                        tag.src = act2[1];
                        tag.type = "module"
                        document.getElementById("extention_import").appendChild(tag);
                        console.log("[extention loader] " + act2[1] + " loaded")
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            } else { }

        });
        var tag = document.createElement("script");
        tag.src = "core.js";
        tag.type = "module"
        document.getElementById("extention_import").appendChild(tag);
        return true
    } catch {
        return null
    }
}