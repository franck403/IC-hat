
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('devID', apiKey);
        displayApiKey();
        location.replace('https://ic-hat.geoloup.com/chat') // return to the main chat
    }
}

function displayApiKey() {
    const storedKey = localStorage.getItem('devID');
    const keyDisplay = document.getElementById('storedKey');
    if (storedKey) {
        keyDisplay.textContent = storedKey;
        keyDisplay.classList.remove('hidden');
    } else {
        keyDisplay.classList.add('hidden');
    }
}

function clearApiKey() {
    localStorage.removeItem('devID');
    displayApiKey();
}

// Show stored API key on page load
displayApiKey();