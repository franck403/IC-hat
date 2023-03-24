add_file = document.getElementById("add_image")
add_file.addEventListener('click', (e) => {
    const formData = new FormData();
    const fileField = document.getElementById("file_input").files
    var storageId = document.getElementsByClassName('active').id
    var url;
    fetch("https://fireimage.francoischoui1.repl.co/success", {
        method: "POST",
        mode:"no-cors",
        body: formData,
    })
    .then((response) => url = response)
    .catch((error) => {
        console.error("Error:", error);
    });
    modal.style.display = "none";
    document.getElementById("file_input").value = "";

});