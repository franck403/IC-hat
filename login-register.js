const iframe = document.querySelector('#not-connected-iframe');
iframe.onload = () => {
    var if1 = document.getElementById("not-connected-iframe");
    var fc = (if1.contentWindow || if1.contentDocument);
    var login = fc.document.getElementById("login");
    var register = fc.document.getElementById("register");
    var start = fc.document.getElementById("start");
    var log_out = fc.document.getElementById("out");
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
            document.location.replace(document.location.origin)
        });
        fc.document.getElementById("no").remove()
    } else {
        login.addEventListener('click', (e) => {
            netlifyIdentity.open("login")
        });
        register.addEventListener('click', (e) => {
            netlifyIdentity.open("signup")
        });
        fc.document.getElementById("yes").remove()
    }
}
if (window.location.href.endsWith("#")) {
    window.location.replace(`${window.location.origin}/chat`)
}
