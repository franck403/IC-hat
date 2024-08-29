import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
function firebaseUpladeBytes(blob,path) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode/' + path);
    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });      
}

// 'base64' is a image string
function firebaseUpladeBase64(base64) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode' + path);
    uploadString(storageRef, base64, 'base64url').then((snapshot) => {
        console.log('Uploaded a base64url string!');
    });
}

window.firebaseUpladeBytes  = firebaseUpladeBytes
window.firebaseUpladeBase64 = firebaseUpladeBase64