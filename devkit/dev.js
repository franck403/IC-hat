
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
        displayApiKey();
    }
}

function displayApiKey() {
    const storedKey = localStorage.getItem('apiKey');
    const keyDisplay = document.getElementById('storedKey');
    if (storedKey) {
        keyDisplay.textContent = '*'.repeat(storedKey.length);
        keyDisplay.classList.remove('hidden');
    } else {
        keyDisplay.classList.add('hidden');
    }
}

function clearApiKey() {
    localStorage.removeItem('apiKey');
    displayApiKey();
}

// Show stored API key on page load
displayApiKey();