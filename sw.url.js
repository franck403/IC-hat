function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const putInCache = async (request, response) => {
    const cache = await caches.open("GlE");
    await cache.put(new Request(new URL("/extention/", "gl-extention:/")), response);
};

const cacheFirst = async (request) => {
    var responseFromCache = await caches.match(request);
    var url = new URL(request.url);
    var pattern1 = /gl-extention:\/cdn\/extention\//i;
    if (pattern1.test(url.pathname)) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
});

self.addEventListener('message', event => {
    console.log(`[Message] event: `, event);
    clients.match(event.data.value[0]).then(clients => {
        client.postMessage({
            value: event.data.value[1]
        });
    })
});

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = ["GlE"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches());
});