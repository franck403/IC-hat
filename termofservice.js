function waitForWindowObject(objectName, callback, checkInterval = 50, timeout = 5000) {
    const start = Date.now();

    const timer = setInterval(() => {
        if (window[objectName]) {
            clearInterval(timer);
            callback(window[objectName]);
        } else if (Date.now() - start >= timeout) {
            clearInterval(timer);
            console.error(`Timeout: ${objectName} was not found in window within ${timeout}ms`);
        }
    }, checkInterval);
}

async function mainds() {
    const mm = document.getElementsByClassName("mm")[0];
    const user = await window.auth0API.getUser();
    if (user) {
        try {
            const termsChecked = user.user_metadata.termofservice;
            if (termsChecked === "yes") {
                mm.style.display = "none";
            } else {
                mm.style.display = "block";
            }
        } catch (e) {
            mm.style.display = "block";
        }
    } else {
        mm.style.display = "none";
    }
}

async function acpt() {
    const mm = document.getElementsByClassName("mm")[0];
    mm.style.display = "none";

    // Update the user's metadata by calling a Netlify serverless function
    // This is the secure way to update user data with Auth0.
    try {
        const response = await fetch('/.netlify/functions/update-user-metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                termofservice: 'yes',
                term: 'User accepted the terms'
            })
        });

        if (!response.ok) {
            console.error('Error updating user metadata');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Immediately invoked function to initialize the Auth0 API and run the main function
waitForWindowObject("auth0API", (async () => {
    await window.auth0API.initialize();
    await mainds();
}));