// no api its bugged
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      const cache = await caches.open('vector-cache');
      const request = event.request;
      const url = new URL(request.url);

      if (url.origin === 'https://vector.profanity.dev' && request.method === 'POST') {
        const clone = request.clone();
        const payload = await clone.json();
        const cacheKey = new Request(request.url + '?' + JSON.stringify(payload), {
          method: request.method,
          headers: request.headers
        });

        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
          return cachedResponse;
        }

        const response = await fetch(request);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseClone = response.clone();
        await cache.put(cacheKey, new Response(JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: responseClone.body
        })));
        return response;
      }
    })().catch(error => {
      console.error(error);
    })
  );
});
*/