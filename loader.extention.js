export function load() {
    try {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        var act2 = main.split(";")
        fetch(act2[1], {method: "GET"})
        .then((response) => response.text())
        .then((data) => {
            var tag = document.createElement("script");
            tag.src = act2[1];
            document.getElementByIdBy("extention_import").appendChild(tag);
            console.log("[extention loader] " + act2[1] + " loaded")
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    
    });
    return true
    } catch {
        return null
    }
}