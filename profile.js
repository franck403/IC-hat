import {getuser,changepic} from ".././bhuy3huygyufwyuge.js"
var myData = await getuser()
var myData = JSON.parse(myData)
var myEmail = myData.email
var myName = myData.name


var c = document.getElementById("box")
c.addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        var filelist = input.files[0]
        var reader = new FileReader();
        reader.onload = function () {
            var img = "png;base64," + btoa(reader.result)
            await changepic(img,myEmail)
        }
        reader.readAsBinaryString(file);    
    };
    input.click();
});