new URL("extention/","https://chat.geoloup.com/")


const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(new Request(new URL("/extention/","gl-extention:/")), response);
  };
  
const cacheFirst = async (request) => {
var responseFromCache = await caches.match(request);
var url = new URL(request.url);
var pattern1 = /gl-extention:\/cdn\/extention\//i;
if (pattern1.test(url.pathname) && responseFromCache) {
        return responseFromCache;
    }
const responseFromNetwork = await fetch(request);
return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
event.respondWith(cacheFirst(event.request));
});