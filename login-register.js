const iframe = document.querySelector('#not-connected-iframe');
iframe.onload = () => {
    var if1 = document.getElementById("not-connected-iframe");
    var fc = (if1.contentWindow || if1.contentDocument);
    var login = fc.document.getElementById("login");
    var register = fc.document.getElementById("register");

    login.addEventListener('click', (e) => {
        netlifyIdentity.open("login") 
    });
    register.addEventListener('click', (e) => {
        netlifyIdentity.open()
    });
}
