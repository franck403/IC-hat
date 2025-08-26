// Function to request a password reset email
async function reset_password() {
    try {
        const user = await window.auth0API.getUser();
        if (user && user.email) {
            const response = await fetch(`https://${auth0Client.domain}/dbconnections/change_password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: auth0Client.clientId,
                    email: user.email,
                    connection: 'Username-Password-Authentication'
                })
            });
            if (response.ok) {
                document.getElementById("user_logout").innerText = "The email was sent.";
            } else {
                throw new Error('Failed to send email.');
            }
        } else {
            throw new Error('User email not found.');
        }
    } catch (error) {
        document.getElementById("user_logout").innerText = "The email was not sent.";
        console.error("Password reset error:", error);
    }
}

// Function to log out the user
function logout() {
    try {
        window.auth0API.logout();
        window.location.replace(window.location.origin);
    } catch {
        window.location.replace(window.location.origin);
    }
}

// Secure function to set the user's profile picture via a serverless function
function set_picture(url) {
    fetch('/.netlify/functions/update-user-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: url })
    }).then(response => {
        if (response.ok) {
            return auth0API.getUser();
        }
        throw new Error('Failed to update picture.');
    }).then(user => {
        const myImage = user.user_metadata.avatar_url;
        if (myImage != null) {
            document.getElementById("user_pic").src = myImage;
            document.getElementById("user_picture_img").src = myImage;
        } else {
            document.getElementById("user_pic").src = "img/default.png";
        }
    }).catch(error => {
        console.error("Error setting picture:", error);
    });
}

// Secure function to set the user's name via a serverless function
function set_name(name) {
    fetch('/.netlify/functions/update-user-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: name })
    }).catch(error => {
        console.error("Error setting name:", error);
    });
}

// The rest of the code remains the same as it does not rely on Netlify Identity

function change_picture() {
    call();
}

function u_close() {
    document.getElementById("div_user").classList.add("inactive");
    document.getElementById("user_name").innerHTML = "";
}

function u_open() {
    document.getElementById("div_user").classList.remove("inactive");
    // Use auth0API to get the user's name
    auth0API.getUser().then(user => {
        if (user && user.name) {
            document.getElementById("user_name").innerHTML = "Hi " + user.name + "!";
        } else {
            document.getElementById("user_name").innerHTML = "Hi!";
        }
    });
}

function call() {
    sendMessage("document.getElementById('selectedFile').click()");
}

function sendMessage(message) {
    const iframe = document.querySelector("iframe");
    iframe.contentWindow.postMessage(message, "*");
    document.getElementById("crop_iframe").classList.add('show');
}

function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}

function base64ToFile(base64, fileName, mimeType) {
    console.log(fileName, mimeType);
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], fileName, { type: mimeType });
}

window.addEventListener('message', function (event) {
    console.log("Message received from the child: " + event.data);
    if (event.data != "close") {
        document.getElementById("crop_iframe").classList.remove('show');
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src;
        Imageupload(base64ToFile(event.data, 'profile.jpeg', 'image/jpeg'), (url) => {
            set_picture(url);
        });
        // 'close' function is not defined, assuming it's an external function
    } else {
        document.getElementById("crop_iframe").classList.remove('show');
        document.getElementById('crop_iframe').src = document.getElementById('crop_iframe').src;
        // 'close' function is not defined
    }
});

var namechanger = (event) => {
    var name = event.target.innerHTML;
    event.target.innerHTML = '';
    var changer = document.createElement('input');
    changer.value = name;
    changer.addEventListener('blur', () => {
        set_name(changer.value);
        changer.remove();
        event.target.innerHTML = changer.value; // Update the name on blur
    });
    event.target.appendChild(changer);
};

document.getElementById('user_name').onclick = namechanger;