function waitForWindowObject(objectName, callback, checkInterval = 50, timeout = 5000) {
    const start = Date.now();

    const timer = setInterval(() => {
        if (window[objectName]) {
            clearInterval(timer);
            callback(window[objectName]);
        } else if (Date.now() - start >= timeout) {
            clearInterval(timer);
            console.error(`Timeout: ${objectName} was not found in window within ${timeout}ms`);
        }
    }, checkInterval);
}

function render() {
    const iframe = document.querySelector('#not-connected-iframe');
    iframe.onload = () => {
        const if1 = document.getElementById("not-connected-iframe");
        const fc = if1.contentWindow;
        const doc = fc.document;

        const login = doc.getElementById("login");
        const register = doc.getElementById("register");
        const start = doc.getElementById("start");
        const log_out = doc.getElementById("out");

        // Wait until auth0API is available
        waitForWindowObject("auth0API", async (auth0API) => {
            await auth0API.initialize();

            try {
                const user = await auth0API.getUser();

                if (user != null) {
                    // Logged in
                    start.addEventListener('click', async () => {
                        try {
                            const userMetadata = (await auth0API.getUser()).user_metadata;
                            const terms = userMetadata?.termofservice;
                            if (terms === 'no') return;
                        } catch { }

                        if (window.location.origin.endsWith("/")) {
                            window.location.replace(`${window.location.origin}chat`);
                        } else {
                            window.location.replace(`${window.location.origin}/chat`);
                        }
                    });

                    log_out.addEventListener('click', () => {
                        auth0API.logout();
                        document.location.replace(document.location.origin);
                    });

                    const noEl = doc.getElementById("no");
                    if (noEl) noEl.remove();
                } else {
                    // Not logged in
                    login.addEventListener('click', () => auth0API.login());
                    register.addEventListener('click', () => auth0API.login());

                    const yesEl = doc.getElementById("yes");
                    if (yesEl) yesEl.remove();
                }
            } catch (err) {
                console.error("Error handling user state:", err);
            }
        });
    };

    // Redirect if URL ends with #
    if (window.location.href.endsWith("#")) {
        window.location.replace(`${window.location.origin}/chat`);
    }
}
