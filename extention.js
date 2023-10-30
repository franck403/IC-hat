document.addEventListener("DOMContentLoaded", (event) => {
    var url = window. location.href;
    import {load} from "./loader.extention.js"
    import {add,check} from "./add.extention.js"
    import {getCookie} from "./bhuy3huygyufwyuge.js"
    
    if (url.endsWith("#")) {
        url = url.slice(0,-1)
    }
    
    if (url == "https://splendorous-hamster-ecd34b.netlify.app/chat"|| url == "https://chat.geoloup.com/chat" || url == "https://ic-hat.geoloup.com/chat" || url == "https://beta.chat.geoloup.com/chat" || url == "https://chat.beta.geoloup.com/chat" ) {
        load()
    } else if (url == "https://splendorous-hamster-ecd34b.netlify.app/store" || url == "https://chat.geoloup.com/store" || url == "https://ic-hat.geloup.com/store" || url == "https://beta.chat.geoloup.com/store" || url == "https://chat.beta.geoloup.com/store") {
        if (localStorage.getItem("extention") != null) {} else {localStorage.setItem("extention","")}
        const btn_add = document.getElementById("add_extention")
        btn_add.addEventListener('click', (event) => {
            if (btn_add.dataset.content != undefined) {
                add(btn_add.dataset.name,btn_add.dataset.content)
                return true
            }
            add(btn_add.dataset.name,"https://" + window.location.host + "/" + btn_add.dataset.url)
        });
        check()
    }
    if (getCookie("geoloup") != null) {
        console.info("[extention core] Extention are enable with id :" + getCookie("geoloup"))
    } else {
        console.info("[extention core] Extention are disable")
    }    
});