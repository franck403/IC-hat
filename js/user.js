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

function set_picture(base64) {
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            avatar_url: base64
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

function set_name() {
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            avatar_url: base64
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
window.addEventListener('message', function (event) {
    console.log("Message received from the child: " + event.data);
    if (event.data != "close") {
        document.getElementById("crop_iframe").classList.remove('show')
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src
        set_picture(event.data)
        close()
    } else {
        document.getElementById("crop_iframe").classList.remove('show')
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src
        close()
    }
});