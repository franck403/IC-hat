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
    } catch {
        window.location.replace(window.location.origin)
    }

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