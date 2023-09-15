fetch("https://I-home.calebgauthier.repl.co/text.html")
.then((response) => response.text())
.then((data) => {
    var ldata = data.replace("<!-- Ce fichier est pour les regles merci de ne pas toucher sauf pour les changer merci -->","")
    document.getElementById("homedata").innerHTML = ldata
})
.catch((error) => {});
var login = document.getElementById("login");
var register = document.getElementById("register");
var start = document.getElementById("start");
var log_out = document.getElementById("out");
var home = netlifyIdentity.currentUser()
if (home != null) {
    start.addEventListener('click', (e) => {
        if (window.location.origin.endsWith("/")) {
            window.location.replace(`${window.location.origin}chat`)
        } else {
            window.location.replace(`${window.location.origin}/chat`)
        }
    });
    log_out.addEventListener('click', (e) => {
        netlifyIdentity.logout()
    });
    document.getElementById("no").remove()
} else {
    login.addEventListener('click', (e) => {
        netlifyIdentity.open("login")
    });
    register.addEventListener('click', (e) => {
        netlifyIdentity.open("signup")
    });
    document.getElementById("yes").remove()
}
if (window.location.href.endsWith("#")) {
    window.location.replace(`${window.location.origin}/chat`)
}