import { getuser, changepic} from ".././bhuy3huygyufwyuge.js"

function Imageupload(image) {
  let formData = new FormData();
  formData.append('name', 'John');
  const request = new XMLHttpRequest();
  request.open("POST", "https://zupimageapi-vyx9hh4wa6t5.runkit.sh/upload", false);
  request.send(formData)
  return request.responseText
}

var myData = await getuser()
if (myData != null) {
    var myData = JSON.parse(myData)
    var myEmail = myData.email
    var myName = myData.name
    var myImage = myData.image
    document.getElementById('user_pic').src = myImage
    document.getElementById("image").src = myImage
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
        var blobUrl = Imageupload(filelist)
        document.getElementById("image").src = blobUrl
        document.getElementById("user_pic_ready").innerHTML = "Select this picture"
        document.getElementById("user_pic_ready").addEventListener("click",() => {
          changepic(img, myEmail)
        })
    };
    input.click();
});
