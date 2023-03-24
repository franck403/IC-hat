
add_file.addEventListener('click', (e) => {
    var storageId = document.getElementsByClassName('active').id
    var imag = document.getElementById("file_input").files
    const file = document.getElementById("file_input").files[0];
    const name = +new Date() + `-${storageId}-` + file.name;
    const metadata = {
       contentType: file.type
    };
    var url;
    fetch("fireimage.francoischoui1.repl.co")
    .then(snapshot => snapshot.ref2.getDownloadURL()) 
    /*const task = ref2.child(name).put(file, metadata);task
    .then(snapshot => snapshot.ref2.getDownloadURL()); */
    modal.style.display = "none";
    document.getElementById("file_input").value = "";

});