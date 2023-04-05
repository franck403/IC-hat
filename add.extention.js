if (localStorage.getItem("extention") != null) {} else {    
    localStorage.setItem("extention","")    
}
export function add(name,url) {
    var old = localStorage.getItem("extention")
    localStorage.setItem("extention", old + "," + name + ";" + url)
}
