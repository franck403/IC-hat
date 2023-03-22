
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

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
    var imag = document.getElementById("file_input")
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded the image');
    });
    document.getElementById("file_input").value = "";

});