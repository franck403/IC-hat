// setting minify code
class MyCustomElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.uuid = crypto.randomUUID()
        const uuid = this.uuid
        var script = 'popupSettingMenuShow("d' + uuid + '")'
        var div = `<div id='${this.uuid}'><i class="fa-solid fa-ellipsis"style="rotate: 90deg;" onclick="popupSettingMenuShow('d${uuid}')"></i><div id='d${uuid}' style="visibility:hidden;" class=context-menu><span class=item onclick="createInviteDiscusion()"><i class="fa-solid fa-user-plus"></i>Create invite</span><span class=item onclick='hidediscusion()'><i class="fa-solid fa-user-minus"></i>Hide for you</span><span class=item onclick="ChangeDisplayName()"><i class="fa-solid fa-pen-to-square"></i>Edit name</span></div></div>`;
        this.innerHTML = div
    }

    disconnectedCallback() {
        try {
            document.getElementById(this.uuid).remove()
        } catch { }
    }
}

function popupSettingMenuShow(uuid) {
    console.log('clicked')
    var pop = document.getElementById(uuid)
    console.log(pop)
    switch (pop.dataset.visible) {
        case "visible":
            pop.dataset.visible = 'hidden'
            console.log('hidden')
            pop.classList.remove('visibleClass')
            break;
        default:
            pop.dataset.visible = "visible"
            console.log('visible')
            pop.classList.add('visibleClass')
            break;
    }
    //!function(i){var e=i.parentNode.querySelector("div");"visible"==e.style.visibility?e.style.visibility="hidden":e.style.visibility="visible"}(this)
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
function uploadFile(file, callback) {
    // window.firebaseUpladeBytes
    const formData = new FormData(); 
    console.log(file)
    formData.append('file', file); axios.post('https://static.geoloup.com/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(response => { 
        console.log('Success:', response.data); 
        callback(response.data.url)
    })
    .catch(error => { console.error('Error:', error); });
}

window.onclick = allclose
// to do create all the button function

function hidediscusion() {
    window.hidediscusionintern(localStorage.getItem('lastChat'))
}
function CustomAlert(message, title, element) {
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
        document.getElementById('dialogoverlay').style.display = 'none';})()
        ` + '">OK</button>';
}
function ChangeDisplayName() {
    var roomid = localStorage.getItem('lastChat')
    var roomelement = document.getElementById(`rename_${roomid}`)
    roomelement.classList.add('rename-active')
}

function createInviteDiscusion() {
    var url = window.createInviteDiscusionIntern()
    console.log(url)
    CustomAlert(`Here the link <input value="https://ic-hat.geoloup.com/chat?invite=${url}" disabled> of the invite`, 'Discusion invite')
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
        // just better delete
        try { this.remove() } catch { }
    }

}
customElements.define("expanding-list", ExpandingList, { extends: "input" });

function Imageupload(image, callback) {
    uploadFile(image, callback)
}
window.Imageupload = Imageupload

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


async function loopThroughElements(parent) {
    for (let child of parent.children) {
        if (child.tagName == 'P' && child.innerHTML == '') {
            child.remove()
        } else if (child.children.length > 0) {
            loopThroughElements(child);
        }
    }
}

function removeEmptyP() {
    loopThroughElements(document.querySelector("#people"))
}

function closeAllSetting() {
    var elements = document.querySelectorAll(".context-menu")
    var elements = [...elements]; 
    elements.forEach(div => {
        div.dataset.visible = 'hidden'
        div.classList.remove('visibleClass')
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    document.body.addEventListener('click',(event)=>{
        // close setting on click
        console.log(event.target)
        if (!event.target.classList.contains('fa-ellipsis')) {
            closeAllSetting()
        }
    })    
})

window.removeEmptyP = removeEmptyP