export function sendNotif(message) {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      console.error('Browser do not supprt notification')
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      console.log('sending notification')
      const notification = new Notification(message);
      // …
    } 
    console.log(Notification.permission)
  
  
}

export function accesPush() {
  if (!("Notification" in window)) {
    console.error('Browser do not supprt notification')
    return false
  } else if (Notification.permission === "granted") {
    return true;
  } else if (Notification.permission === "denied") {
    return false
  }else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log('Granted')
      }
    });
    return 'W1'
  }
}