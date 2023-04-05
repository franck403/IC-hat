var url = window. location. href;
import {load} from "./loader.extention.js"
import {add} from "./add.extention.js"
console.log(url)
if (url = "https://splendorous-hamster-ecd34b.netlify.app/") {
    console.log("1")
    load()
}
else if (url = "https://splendorous-hamster-ecd34b.netlify.app/store") {
    console.log("2")
    const btn_add = document.getElementById("add_extention")
    btn_add.addEventListener('click', (event) => {
        add("crypted message","https://splendorous-hamster-ecd34b.netlify.app/store/crypted.js")
    });
}