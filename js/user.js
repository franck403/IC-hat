function reset_password() {
    try {
        netlifyIdentity.gotrue.requestPasswordRecovery(netlifyIdentity.gotrue.currentUser().email)
        document.getElementById("user_logout").innerText = "The Email was send"
    } catch {
        document.getElementById("user_logout").innerText = "The Email was not send"
    }
}

function logout() {
    try {
        netlifyIdentity.logout()
        window.location.replace(window.location.origin)
    } catch {
        window.location.replace(window.location.origin)
    }

}

function set_picture(url) {
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            avatar_url: url
        }
    }).then((user) => {
        var myImage = netlifyIdentity.currentUser().user_metadata.avatar_url
        if (myImage != null) {
            document.getElementById("user_pic").src = myImage
            document.getElementById("user_picture_img").src = myImage
        } else {
            document.getElementById("user_pic").src = "img/default.png"
        }
    }
    )
}

function set_name(name) {
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            full_name: name
        }
    }).then((user) => {}
    )
}

function change_picture() {
    call()
}

function u_close() {
    document.getElementById("div_user").classList.add("inactive")
    document.getElementById("user_name").innerHTML = "";
}
function u_open() {
    document.getElementById("div_user").classList.remove("inactive")
    document.getElementById("user_name").innerHTML = "Hi " + localStorage.getItem("name") + "!";
}

function call() {
    sendMessage("document.getElementById('selectedFile').click()")
}
function sendMessage(message) {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage(message, "*");
    document.getElementById("crop_iframe").classList.add('show')
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
function base64ToFile(base64, fileName, mimeType) {
    console.log(fileName, mimeType)
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
}


window.addEventListener('message', function (event) {
    console.log("Message received from the child: " + event.data);
    if (event.data != "close") {
        document.getElementById("crop_iframe").classList.remove('show')
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src
        Imageupload(base64ToFile(event.data,'profile.jpeg','image/jpeg'),(url)=>{
            set_picture(url)
        })
        close()
    } else {
        document.getElementById("crop_iframe").classList.remove('show')
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src
        close()
    }
});

var namechanger = (event) => {
    var name = event.target.innerHTML
    event.target.innerHTML = ''
    var changer = document.createElement('input')
    changer.value = name
    changer.addEventListener('blur', () => {
        set_name(changer.value)
        changer.remove()
        event.target.innerHTML = name
    });
    event.target.appendChild(changer)
}


document.getElementById('user_name').onclick = namechanger