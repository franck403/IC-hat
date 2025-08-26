const api = {
    getUser: getUser,
    alert: Alert
};

export async function getUser() {
    try {
        const user = await window.auth0API.getUser();
        if (user) {
            return {
                "email": user.email,
                "user_metadata": user.user_metadata
            };
        } else {
            location.reload();
        }
    } catch (error) {
        console.error("Error getting user:", error);
        location.reload();
    }
}

export function Alert(message, title, callback) {
    document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById('dialogoverlay');
    let dialogbox = document.getElementById('dialogbox');

    let winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";

    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById('dialogboxhead').style.display = 'block';

    if (typeof title === 'undefined') {
        document.getElementById('dialogboxhead').style.display = 'none';
    } else {
        document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
    }
    document.getElementById('dialogboxbody').innerHTML = message;
    document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="' + `(() => {
        document.getElementById('dialogbox').style.display = 'none';
        document.getElementById('dialogoverlay').style.display = 'none';
        ${callback}})()
        ` + '">OK</button>';
}