export function sendNotif(message) {
  if (typeof window !== 'undefined' && window.Android && window.Android.showNotification) {
    // For Android WebView
    window.Android.showNotification(message);
  } else if (typeof window !== 'undefined' && 'Notification' in window) {
    // For browsers with Notification API
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Sending browser notification');
        new Notification(message);
      } else {
        console.log('Notification permission denied', permission);
      }
    });
  } else {
    // Fallback for environments without Notification API
    console.warn('Notification API is not available in this environment.');
  }
}

export async function accesPush() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.error('Browser does not support notifications');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
      return true;
    } else if (permission === 'denied') {
      console.log('Notification permission denied');
      return false;
    } else {
      // Permission was not explicitly granted or denied (e.g., dismissed)
      console.log('Notification permission dismissed or default');
      return 'W1'; // Or handle this case as needed
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}