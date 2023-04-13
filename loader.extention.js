export function load() {
    try {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        if (main != "") {
            var act2 = main.split(";")
            fetch(act2[1], {method: "GET"})
            .then((response) => response.text())
            .then((data) => {
                var tag = document.createElement("script");
                tag.src = act2[1];
                tag.type = "module" 
                document.getElementById("extention_import").appendChild(tag);
                tag.setAttribute("type","module")
                console.log("[extention loader] " + act2[1] + " loaded")
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } else{}
    
    });
    var tag = document.createElement("script");
    tag.src = "core_buie_fffffffffffffffffijkhdiuchfiuhcdiuhauisuidsf.js";
    tag.type = "module" 
    document.getElementById("extention_import").appendChild(tag);
    // tag.setAttribute("type","module")
    return true
    } catch {
        return null
    }
}