// setting minify code
class MyCustomElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.uuid = crypto.randomUUID()
        const uuid = this.uuid
        var script = 'popupSettingMenuShow("d' + uuid + '")'
        var style = `@media screen and (min-width:900px){.context-menu{background-color:#fff;color:#1f194c;max-width:200px;z-index:10;padding:4px;font-size:20px;display:flex;flex-wrap:wrap;position:fixed;border-radius:5px;border:1px solid #00000030;visibility:hidden}.context-menu span{color:#000;padding:10px;width:100%}.context-menu span i{margin-right:20px;color:#000}.context-menu span i:hover{background-color:rgba(44,141,247,.2);color:#000}.item{color:#000}.context-menu span:hover{color:#000;background-color:rgba(44,141,247,.2);cursor:pointer}}@media screen and (max-width:900px){.context-menu{background-color:#fff;color:#1f194c;max-width:200px;z-index:10;padding:4px;font-size:20px;display:flex;flex-wrap:wrap;position: relative;right: 60px;border-radius:5px;border:1px solid #00000030;visibility:hidden}.context-menu span{color:#000;padding:10px;width:100%}.context-menu span i{margin-right:20px;color:#000}.context-menu span i:hover{background-color:rgba(44,141,247,.2);color:#000}.item{color:#000}.context-menu span:hover{color:#000;background-color:rgba(44,141,247,.2);cursor:pointer}}`
        var div = `<div id='${this.uuid}'><style>${style}</style><i class="fa-solid fa-ellipsis"style="rotate: 90deg;" onclick="popupSettingMenuShow('d${uuid}')"></i><div id='d${uuid}' class=context-menu><span class=item onclick="createInviteDiscusion()"><i class="fa-solid fa-user-plus"></i>Create invite</span><span class=item onclick='hidediscusion()'><i class="fa-solid fa-user-minus"></i>Hide for you</span><span class=item onclick="ChangeDisplayName()"><i class="fa-solid fa-pen-to-square"></i>Edit name</span></div></div>`;
        this.innerHTML = div
    }

    disconnectedCallback() {
        try {
        document.getElementById(this.uuid).remove()
        } catch {}
    }
}

function popupSettingMenuShow(uuid) {
    console.log('clicked')
    //!function(i){var e=i.parentNode.querySelector("div");"visible"==e.style.visibility?e.style.visibility="hidden":e.style.visibility="visible"}(this)
    var pop = document.getElementById(uuid)
    console.log(uuid)
    console.log(pop)
    if (pop.style.visibility == "hidden") {
        pop.style.visibility="visible"
    } else {
        pop.style.visibility="hidden"
    }
}

customElements.define("popup-setting-menu", MyCustomElement);
// to create <popup-setting-menu></popup-setting-menu>
// make popumenu disapera after click
function allclose() {
    var elements = document.getElementsByClassName('context-menu')
    for (let index = 0; index < elements.length; index++) {
        var element = elements[index];
        element.style.visibility = "hidden"
    }
}
function uploadFile(file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name) === false) { return false }
    var url = `https://api.cloudinary.com/v1_1/djsemwoio/upload`;
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tags for image admin in Cloudinary
    fd.append('file', file);
    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.send(fd)
    const data = response.json()
    var url = data.secure_url;
    // Create a thumbnail of the uploaded image, with 150px width
    const tokens = url.split('/');
    tokens.splice(-3, 0, 'w_150,c_scale');
    const img = new Image();
    const opt = `https://res.cloudinary.com/freshpm/image/upload/c_scale,w_500/f_auto/q_auto/${tokens.join('/')}`;
    img.src = opt;
    img.alt = data.public_id;
    return img
}

window.onclick = allclose
// to do create all the button function

function hidediscusion() {
    window.hidediscusionintern(localStorage.getItem('lastChat'))
}

function ChangeDisplayName() {
    var roomid = localStorage.getItem('lastChat')
    var roomelement = document.getElementById(`rename_${roomid}`)
    roomelement.classList.add('rename-active')
}

function createInviteDiscusion() {
    var url = window.createInviteDiscusionIntern()
    console.log(url)
    return url
}

// Create a class for the element
class ExpandingList extends HTMLInputElement {

    constructor() {
        // Always call super first in constructor
        self = super();
    }

    connectedCallback() {
        self.addEventListener("keypress", function (event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                var element = event.target
                var parent = event.target.parentElement
                window.lastEv = event
                window.changeDisplayNameIntern(element.id.replace('rename_', ''), element.value)
                event.target.value = ''
                event.target.classList.remove('rename-active')
            }
        });
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

}
customElements.define("expanding-list", ExpandingList, { extends: "input" });

function Imageupload(image) {
    var img = uploadFile(image)
    return img.src
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
