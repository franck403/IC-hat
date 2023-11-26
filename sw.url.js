function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

const putInCache = async (response, uuid) => {
    const cache = await caches.open("GlE-" + uuid);
    await cache.put(new Request("/GlE/" + uuidv4()), response);
};

const cacheFirst = async (request) => {
    var responseFromCache = await caches.match(request);
    var url = new URL(request.url);
    if (url.search("/GlE/") != -1) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
});

self.addEventListener('message', async (event) => {
    console.log(event)
    if (event.data[2] == "start") {
        const cacheKeepList = ["GlE-" + event.data[0]];
        const keyList = await caches.keys();
        const cachesToDelete = keyList.filter((key) => cacheKeepList.includes(key));
        await Promise.all(cachesToDelete.map(deleteCache));    
    } else {
        putInCache(event.data[1], event.data[0])
        clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    value: event.data.value
                });
            })
        })
    }
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