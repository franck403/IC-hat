fetch("https://I-home.calebgauthier.repl.co/text.html")
.then((response) => response.text())
.then((data) => {
    var ldata = data.replace("<!-- Ce fichier est pour les regles merci de ne pas toucher sauf pour les changer merci -->","")
    document.getElementById("homedata").innerHTML = ldata
})
.catch((error) => {
    console.error("Error:", error);
});


