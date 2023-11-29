self.addEventListener('push', function(event) {
    const title = 'New Message';
    const options = {
      body: 'Hello, world!',
    };
  event.waitUntil(self.registration.showNotification(title, options));
});