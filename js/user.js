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
            avatar_url: bass64
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

function imageToDataUri(img, width, height) {
    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

function base64ToDataUri(base64) {
    return 'data:image/png;base64,' + base64;
}

function change_picture() {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        var file = e.target.files[0];
        input.close();
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            set_picture(base64ToDataUri(imageToDataUri(content, 100, 100)))
        }
    }
    input.click();
}

function close() {
    document.getElementById("div_user").classList.add("inactive")
}
function u_open() {
    document.getElementById("div_user").classList.remove("inactive")
}