import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
function firebaseUpladeBytes(blob) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode');
    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });      
}


function firebaseUpladeBase64(base64) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode');
    uploadString(storageRef, base64, 'base64url').then((snapshot) => {
        console.log('Uploaded a base64url string!');
    });
}