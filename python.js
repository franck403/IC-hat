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
        return data.stdout
    } else { console.error("Error fetching data:", response.status, response.statusText); }
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

function fixJS(code) {
    code = code.replace(/from\s+'(\w+)'/g, "from 'https://ic-hat.geoloup.com/$1.js'");
    code = code.replace(/apifrdrr.(\w+)\(\)/g, " await bhuy3huygyufwyuge.$1()");
    return code;
}
  
async function ImportPY(filepath) {
    var myText = await loadPYFromFile(filepath);
    var myText = fixJS(myText)
    const blob = new Blob([myText], { type: 'text/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    const scriptElement = document.createElement('script');
    scriptElement.type = 'module'
    scriptElement.async = true
    scriptElement.src = blobUrl;
    document.head.appendChild(scriptElement);
}

ImportPY('convert.py')