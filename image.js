import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
    authDomain: "ic-hat.firebaseapp.com",
    databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
    projectId: "ic-hat",
    storageBucket: "ic-hat.appspot.com",
    messagingSenderId: "720687529085",
    appId: "1:720687529085:web:2d964e880c5e2398058514",
    measurementId: "G-YC8K0D7GLR"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
export function firebaseUpladeBytes(blob,path) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode/' + path);
    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });      
}

// 'base64' is a image string
export function firebaseUpladeBase64(base64) {
    const storage = getStorage();
    const storageRef = ref(storage, 'uplode' + path);
    uploadString(storageRef, base64, 'base64url').then((snapshot) => {
        console.log('Uploaded a base64url string!');
    });
}

window.firebaseUpladeBytes  = firebaseUpladeBytes
window.firebaseUpladeBase64 = firebaseUpladeBase64