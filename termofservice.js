function mainds() {
    var mm = document.getElementsByClassName("mm")[0];
    var span = document.getElementsByClassName("cls")[0];
    var checked = netlifyIdentity.gotrue.currentUser().user_metadata.termofservice
    if (checked === "yes") {
        mm.style.display = "none";
    } else {
        mm.style.display = "block";
    };

}
function acpt() {
    mm.style.display = "none";
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            termofservice: 'yes',
            term: 'User accepted the terms'
        }
    })
};
setTimeout(mainds, 1000)