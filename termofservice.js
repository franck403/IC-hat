// This is the code for a Terms of Service management script.
// It checks if a user has accepted the terms and provides a function to record their acceptance.

// The main function to check the terms of service and hide/show a modal.
// It's asynchronous to handle the asynchronous nature of the Auth0 API.
async function mainds() {
    // Get the modal element
    const mm = document.getElementsByClassName("mm")[0];

    // Wait for the user to be loaded from Auth0
    const user = await window.auth0API.getUser();

    if (user) {
        try {
            // Access the 'termofservice' metadata from the user object
            const termsChecked = user.user_metadata.termofservice;
            if (termsChecked === "yes") {
                mm.style.display = "none";
            } else {
                mm.style.display = "block";
            }
        } catch (e) {
            // In case of error (e.g., metadata not found), show the modal
            mm.style.display = "block";
        }
    } else {
        // If no user is logged in, hide the modal
        mm.style.display = "none";
    }
}

// Function to securely accept the terms of service.
// This function calls a backend API to update the user's profile.
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
(async () => {
    await window.auth0API.initialize();
    await mainds();
})();