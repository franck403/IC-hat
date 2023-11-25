function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}
var startup = async () => {
    window.uuid = uuidv4()

    if ("serviceWorker" in navigator) {
        try {
            let sw = await navigator.serviceWorker.register("serviceWorker.js", { scope: "gl-extention:/" + uuidv4() +"/" });
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', sw.scope);
            navigator.serviceWorker.addEventListener('message', event => {
                num = event.data.value;
                increasePoint(num);
                // console.log(event.data.value);
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
var startup = undefined