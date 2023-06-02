import {getuser,changepic,removeloader} from ".././bhuy3huygyufwyuge.js"
var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    var myImage = myData.image
    var myImage = myImage.replaceAll('"',"")
    var myImage = myImage.replaceAll("'","")
    document.getElementById("user_pic").src = myImage
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData == null){
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData.search("<title>500 Internal Server Error</title>") != -1) {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
} else {
    document.getElementById("connected").remove()
    document.getElementById("wait-connected").remove()
}
var c = document.getElementById("box")
c.addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        var filelist = input.files[0]
        var reader = new FileReader();
        reader.onload = function () {
            var img = "data:image/png;base64-" + btoa(reader.result)
            changepic(img,myEmail)
        }
        reader.readAsBinaryString(input.files[0]);    
    };
    input.click();
});
removeloader