function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}
var GlEbackup = startup
var GlESW = undefined
window.GlESW = undefined
var startup = async () => {
    window.uuid = uuidv4()

    if ("serviceWorker" in navigator) {
        try {
            let sw = await navigator.serviceWorker.register("sw.url.js", { scope: "/GlE/" + uuidv4() +"/" });
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', sw.scope);
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data.value[0] == window.uuid) {

                }
            });
            navigator.serviceWorker.ready.then((registration) => {
                window.GlESW = registration.active
                registration.active.postMessage([uuidv4(),undefined,"start"]);
            });
        } catch (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }
        // declaring scope manually
    } else {
        console.error("Service workers are not supported.");
    }
}
startup()
var startup = GlEbackup

// wrapper for the functions

var GlE = {
    createUrl : async (url) => {
        var id = uuidv4()
        window.GlESW.postMessage([uuidv4(),id,"addURL",url]);
        return id
    },
    revokeUrl : async (uuid) => {
        var id = uuid
        window.GlESW.postMessage([uuidv4(),id,"removeURL"]);
        return id
    },
    getUrl : async (uuid) => {
        var id = uuid
        window.GlESW.postMessage([uuidv4(),id,"removeURL"]);
        return id
    }
}
window.GlE = GlE