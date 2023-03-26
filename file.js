add_file = document.getElementById("add_image")
add_file.addEventListener('click', (e) => {
    const formData = new FormData();
    
    const fileField = document.getElementById("file_input").files[0]
    formData.append('file', fileField)
    var storageId = document.getElementsByClassName('active').id
    var url;
    fetch("https://fireimage.francoischouin1.repl.co/success", {
        method: "POST",
        body: formData
    })
    .then((response) => url = response)
    .catch((error) => {
        console.error("Error:", error);
    });
    document.getElementById("file").style.display = "none";
    document.getElementById("file_input").value = "";

});

const form  = document.getElementById('add_image');

form.addEventListener('submit', (event) => {
    event.preventDefault();
});