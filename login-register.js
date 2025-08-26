const iframe = document.querySelector('#not-connected-iframe');
iframe.onload = async () => {
    var if1 = document.getElementById("not-connected-iframe");
    var fc = (if1.contentWindow || if1.contentDocument);
    var login = fc.document.getElementById("login");
    var register = fc.document.getElementById("register");
    var start = fc.document.getElementById("start");
    var log_out = fc.document.getElementById("out");
    await window.auth0API.initialize();
    const user = await wwindow.auth0API.getUser();
    
    if (user != null) {
        start.addEventListener('click', async (e) => {
            try {
                const userMetadata = (await window.auth0API.getUser()).user_metadata;
                const terms = userMetadata.termofservice;
                if (terms == 'no') { return; }
            } catch {}
            if (window.location.origin.endsWith("/")) {
                window.location.replace(`${window.location.origin}chat`);
            } else {
                window.location.replace(`${window.location.origin}/chat`);
            }
        });
        log_out.addEventListener('click', (e) => {
            window.auth0API.logout();
            document.location.replace(document.location.origin);
        });
        fc.document.getElementById("no").remove();
    } else {
        login.addEventListener('click', (e) => {
            window.auth0API.login();
        });
        register.addEventListener('click', (e) => {
            window.auth0API.login();
        });
        fc.document.getElementById("yes").remove();
    }
}
if (window.location.href.endsWith("#")) {
    window.location.replace(`${window.location.origin}/chat`);
}