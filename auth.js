function script(file) {
    var elem = document.createElement("script");
    elem.src = file
    document.getElementsByTagName("head")[0].appendChild(elem)
}

var url = '<script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>'
script(url)