import { getuser, changepic} from ".././bhuy3huygyufwyuge.js"
var Imageupload = window.Imageupload

var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    var myImage = myData.image
    document.getElementById("not-connected").remove()
    document.getElementById("wait-connected").remove()
} else if (myData == null) {
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
        // uploading image and get return adress
        Imageupload(filelist,(blobUrl)=>{
            document.getElementById("image").src = blobUrl
            document.getElementById("user_pic_ready").innerHTML = "Select this picture"
            document.getElementById("user_pic_ready").addEventListener("click",() => {
              changepic(img, myEmail)
            })
        })
    };
    input.click();
});
