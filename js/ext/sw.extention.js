const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
  };
  
  const cacheFirst = async (request) => {
    var responseFromCache = await caches.match(request);
    var url = new URL(request.url);
    var pattern1 = /\/cdn\/extention\//i;
    if (pattern1.test(url.pathname) && responseFromCache) {
          return responseFromCache;
        }
    const responseFromNetwork = await fetch(request);
    return responseFromNetwork;
  };
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
  });