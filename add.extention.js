if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}
const putInCache = async (request) => {
    response = await fetch(request)
    if (url.search("api/extention/") != -1) {
        const cache = await caches.open("extention");
        var id = url.split("/").reverse()[0]
        await cache.put(request, response);
    }
};

export function add(name,url) {
    if (url.search("https://") == -1) {
        putInCache()        
        return true
    } else {
        var old = localStorage.getItem("extention")
        localStorage.setItem("extention", old +  "," + name + ";" + url)
    }
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