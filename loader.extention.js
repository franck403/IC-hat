export function load() {
    var ext = localStorage.getItem("extention")
    var act = ext.split(",")
    act.forEach((main) => {
        var act2 = main.split(";")
        console.info("loading " + act2[0] + " with url : " + act2[1])
    });
}