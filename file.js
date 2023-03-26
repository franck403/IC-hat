add_file = document.getElementById("add_image")
add_file.addEventListener('click', (e) => {
    const formData = new FormData();
    
    const fileField = document.getElementById("file_input").files
    formData.append('file', fileField.files)
    var storageId = document.getElementsByClassName('active').id
    var url;
    fetch("https://fireimage.francoischouin1.repl.co/success", {
        method: "POST",    
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        mode:"no-cors",
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
    form.submit();
});