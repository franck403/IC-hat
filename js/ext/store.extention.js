const putInCache = async (request) => {
    response = await fetch(request)
    if (url.search("api/extention/") != -1) {
        const cache = await caches.open("extention");
        var id = url.split("/").reverse()[0]
        await cache.put(request, response);
        }
};

const cacheFirst = async (request) => {
    const url = new URL(request.url);
    var cache = caches.open("extention")
    var responseFromCache = await cache.match(request)
    if (responseFromCache) {
        return responseFromCache;
    }
    return false;
};