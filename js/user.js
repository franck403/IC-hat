function reset_password() {
    try {
        netlifyIdentity.gotrue.requestPasswordRecovery(netlifyIdentity.gotrue.currentUser().email)
        document.getElementById("user_logout").innerText ="The Email was send"
    } catch {
        document.getElementById("user_logout").innerText ="The Email was not send"
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

function set_picture(base64){
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            avatar_url: bass64
        }
    }).then(user => console.log(user))
}


function change_picture() {
    console.log("[info] change picture is in active devloppment")
}

function close() {
    document.getElementById("div_user").classList.add("inactive")
}
function u_open() {
    document.getElementById("div_user").classList.remove("inactive")
}