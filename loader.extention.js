export function load() {
    try {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        var act2 = main.split(";")
        var script1 = document.getElementById("extention_import").innerHTML       
        document.getElementById("extention_import").innerHTML = script1 + "<script src='" + act2[1] + "'" + "></script>"
        fetch("https://fireimage.francoischouin1.repl.co/success", {method: "GET"})
        .then((response) => response.text())
        .then((data) => {
            var load_function=new Function (data);
            load_function();
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