var url = window. location. href;

if (url = "https://splendorous-hamster-ecd34b.netlify.app/") {
    import {load} from "./loader.extention.js"
    load()
}
else if (url = "https://splendorous-hamster-ecd34b.netlify.app/store") {
    import {add} from "./add.extention.js"
    const btn_add = document.getElementById("add_extention")
    btn_add.addEventListener('click', (event) => {
        add("crypted message","https://splendorous-hamster-ecd34b.netlify.app/store/crypted.js")
    });
}