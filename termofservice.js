var mm = document.getElementsByClassName("mm")[0];
var span = document.getElementsByClassName("cls")[0];
var checked = netlifyIdentity.gotrue.currentUser().user_metadata.termofservice
if (checked === "yes") {
    mm.style.display = "none";
} else {
    mm.style.display = "block";
};

function acpt() {
    mm.style.display = "none";
    netlifyIdentity.gotrue.currentUser().update({
        data: {
            termofservice: 'yes',
            term:'Welcome to Ic-hat! These Terms of Service govern your use and outline the rights and responsibilities between you and us. By accessing or using the Application, you agree to be bound by these Terms. Please take note that the'
        }
    })
};