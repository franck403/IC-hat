import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getStorage, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";


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
const storage = getStorage(app);

// Get the modal
var modal = document.getElementById("file");

// Get the button that opens the modal
var btn = document.getElementById("add_file");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const add_file = document.getElementById("add_file");

add_file.addEventListener('click', (e) => {
    modal.style.display = "none";
    const ref2 = storage().ref();
    var storageId = document.getElementsByClassName('active').id
    var imag = document.getElementById("file_input").files
    const file = document.getElementById("file_input").files[0];
    const name = +new Date() + `-${storageId}-` + file.name;
    const metadata = {
       contentType: file.type
    };
    const task = ref2.child(name).put(file, metadata);task
    .then(snapshot => snapshot.ref2.getDownloadURL());

    document.getElementById("file_input").value = "";

});