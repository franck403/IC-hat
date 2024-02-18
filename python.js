async function convertPyToJs(code) {
    const sanitizedCode = code.replaceAll('"', '\"');
    const response = await fetch("https://api.extendsclass.com/convert/python/es6", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-site", },
        referrer: "https://extendsclass.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: sanitizedCode,
        mode: "cors",
        credentials: "omit",
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data.stdout);
        return eval(data.stdout)
    } else { console.error("Error fetching data:", response.status, response.statusText); }
}


const visitedDirs = new Set(); // Set to keep track of visited directories
const dirStack = []; // Stack to store directories to process

async function PYprocessDirectory(dirHandle) {
    if (visitedDirs.has(dirHandle)) {
        // Skip this directory if it has already been visited
        return;
    }

    visitedDirs.add(dirHandle); // Mark the current directory as visited
    dirStack.push(dirHandle); // Add the current directory to the stack

    while (dirStack.length > 0) {
        const currentDir = dirStack.pop(); // Get the last directory from the stack

        for await (const entry of currentDir.values()) {
            if (entry.kind === 'file') {
                try {
                    // Handle file content as before
                    const file = await entry.getFile();
                    var fileContent = await file.text();
                    var fileContent = await convertPyToJs(fileContent);
                    console.log(`File "${entry.name}" content:\n${fileContent}`);
                } catch {
                    console.log('Not supported python thing')
                }
            } else if (entry.kind === 'directory') {
                // Add subdirectories to the stack
                dirStack.push(entry);
            }
        }
    }
}

async function loadDataFromFile(onlinePath) {
    var response = await fetch(onlinePath, {
        "headers": {
            "accept": "*/*",
            "accept-language": "fr,en;q=0.9,hmn;q=0.8,nl;q=0.7",
            "content-type": "text/plain;charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    });
    if (response.ok) {
        const data = await response.text();
        return data
    } else { console.error("Error fetching data:", response.status, response.statusText); }
}


async function loadPYFromFile(path) {
    var path = '/python/' + path
    var data = await loadDataFromFile(path)
    return await convertPyToJs(data)
}

async function ImportPY(filepath) {
    const myText = await loadPYFromFile(filepath);
    const blob = new Blob([myText], { type: 'text/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    const scriptElement = document.createElement('script');
    scriptElement.src = blobUrl;
    document.head.appendChild(scriptElement);
}

ImportPY('convert.py')