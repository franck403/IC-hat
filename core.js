import { setCookie, bip, removeloader, getuser, message_date, message_render, embed_render, decrypt } from "./functions.js"
import { sendNotif, accesPush } from './notification.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onChildAdded,
    onChildChanged,
    update,
    onDisconnect
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
localStorage.setItem("state", "no")
var Imageupload = window.Imageupload
const firebaseConfig = {
    apiKey: atob("QUl6YVN5RDlwbzdsLXZ3TzBWclkxck1ZREZUWU5sRUJ2NTRUNmRv"),
    authDomain: "ic-hat.firebaseapp.com",
    databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
    projectId: "ic-hat",
    storageBucket: "ic-hat.appspot.com",
    messagingSenderId: "720687529085",
    appId: "1:720687529085:web:2d964e880c5e2398058514",
    measurementId: "G-YC8K0D7GLR"
};
const None = null
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('profnity.js').then(registration => {
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
accesPush()
const app = initializeApp(firebaseConfig); // sync ?
const database = getDatabase(app);
window.appFire = app
window.databaseFire = database
window.userdb = []
setTimeout(removeloader, 1000)

var myData = await getuser()
if (myData != null) {
    var myEmail = myData.email
    var myName = myData.user_metadata.full_name
    var myImage = myData.user_metadata.avatar_url
    document.getElementById("user_name").innerText = myName
    var data = {
        name: myName,
        email: myEmail,
        image: myImage
    }
    try {
        set(ref(database, 'user/' + myEmail.replace(/\W/g, '')), data);
    } catch {
        var data = {
            name: myName,
            email: myEmail,
            image: 'img/default.png'
        }
        set(ref(database, 'user/' + myEmail.replace(/\W/g, '')), data);
    }
    if (myImage != null && myImage != '\n') {
        document.getElementById("user_pic").src = myImage
        document.getElementById("user_picture_img").src = myImage
    } else {
        document.getElementById("user_pic").src = "img/default.png"
    }
    setCookie("email", myEmail)
    setCookie("name", myName)
    document.getElementById("not-connected").remove()
} else {
    document.getElementById("connected").remove()
    location.replace(window.location.origin)
}
export function fromHTML(html, trim = true, id) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    template.id = id
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}
export async function resizeImage(dataUrl, targetFileSizeKb, maxDeviation = 1) {
    let originalFile = await urltoFile(dataUrl, 'test.png', 'image/png');
    if (originalFile.size / 1000 < targetFileSizeKb)
        return dataUrl; // File is already smaller

    let low = 0.0;
    let middle = 0.5;
    let high = 1.0;

    let result = dataUrl;

    let file = originalFile;

    while (Math.abs(file.size / 1000 - targetFileSizeKb) > maxDeviation) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = document.createElement('img');

        const promise = new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
        });

        img.src = dataUrl;

        await promise;

        canvas.width = Math.round(img.width * middle);
        canvas.height = Math.round(img.height * middle);
        context.scale(canvas.width / img.width, canvas.height / img.height);
        context.drawImage(img, 0, 0);
        file = await urltoFile(canvas.toDataURL(), 'test.png', 'image/png');

        if (file.size / 1000 < (targetFileSizeKb - maxDeviation)) {
            low = middle;
        }
        else if (file.size / 1000 > targetFileSizeKb) {
            high = middle;
        }

        middle = (low + high) / 2;
        result = canvas.toDataURL();
    }

    return result;
}

export function print(text) {
    preventDefault()
    console.log(text)
}

export function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

export function filetoUrl(file) {
    var reader = new FileReader();
    let last_image_url = None
    reader.readAsDataURL(file);
    reader.onload = function () {
        last_image_url = reader.result
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
    return last_image_url
}

export function image_render(email, name) {
    var myName = name
    var name = email;
    var filelist = document.getElementById("file_input").files
    Object.keys(filelist).forEach(key => {
        var file = document.getElementById("file_input").files[key]
        Imageupload(file, (imgurl) => {
            var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
            const id = push(child(ref(database), 'messages')).key;
            console.log(imgurl)
            set(ref(database, "messages/" + cusid + "/" + id), {
                email: name,
                name: myName,
                friend: "none",
                type: "CDNIMAGE",
                message: imgurl,
                date: Date.now(),
                dname: cusid
            })
            document.getElementById("file").style.display = "none";
            document.getElementById("file_input").value = "";

        })
    });
}
try {
    const send = document.getElementById("send");
    const send2 = document.getElementById("content");
    const friends = document.getElementById("new_friend_add");
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("new_friend");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it

    // Get the modal
    var modal2 = document.getElementById("file");

    // Get the button that opens the modal
    var btn2 = document.getElementById("add_file");

    // Get the <span> element that closes the modal
    var span2 = document.getElementsByClassName("close")[1];

    // When the user clicks the button, open the modal 
    btn2.onclick = function () {
        modal2.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span2.onclick = function () {
        modal2.style.display = "none";
    }
    function allclose() {
        var elements = document.getElementsByClassName('context-menu')
        for (let index = 0; index < elements.length; index++) {
            var element = elements[index];
            if (element.style.visibility != "hidden") {
                element.style.visibility = "hidden"
            }
        }
    }
    function allclose1() {
        var elements = document.getElementsByClassName('rename-active')
        for (let index = 0; index < elements.length; index++) {
            var element = elements[index];
            element.classList.remove('rename-active')
        }
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        window.ev = event
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target.parentElement.tagName.toLowerCase() != 'popup-setting-menu') {
            allclose()
            allclose1()
        }
    }

    friends.addEventListener('click', (e) => {
        if (document.getElementById("friend_email").value == "") {
            var list = document.querySelectorAll(".check");
            if (list != undefined) {
                var fg = []
                list.forEach(item => {
                    fg.push(item.id)
                });
                var fg = fg.join(",")
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
                var before_friend = fg + "," + myEmail
                var after_friend = before_friend.split(" ")
                var endfriend = []
                after_friend.forEach(item => {
                    if (item.search("@" != -1)) {
                        endfriend.push(item)
                    }
                });
                var data = {
                    allow: endfriend,
                    dname: customid
                }
                document.getElementById("firend_list_preview").innerHTML = ""
            } else { }
        } else {
            var fg = document.getElementById('friend_email').value
            var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            if (document.getElementById('friend_email').value != "" && document.getElementById('friend_email').value != " " && fg.replace(/\s/g, '').length != 0) {
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
                var before_friend = fg + "," + myEmail
                var after_friend = before_friend.split(",")
                var endfriend = []
                after_friend.forEach(item => {
                    if (item.search("@" != -1)) {
                        endfriend.push(item)
                    }
                });
                var data = {
                    allow: endfriend,
                    dname: customid
                }
                set(ref(database, 'messages/' + customid + "/"), data);
                set(ref(database, 'users_friend/' + customid), data);
                document.getElementById('friend_email').value = "";
                modal.style.display = "none";
            } else { }
        }
    });

    function createDisc(fg) {
        var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        if (fg != "" && fg != " " && fg.replace(/\s/g, '').length != 0) {
            var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail))
            var before_friend = fg + "," + myEmail
            var after_friend = before_friend.split(",")
            var endfriend = []
            after_friend.forEach(item => {
                if (item.search("@" != -1)) {
                    endfriend.push(item)
                }
            });
            var data = {
                allow: endfriend,
                dname: customid
            }
            /*

            */
            set(ref(database, 'messages/' + customid + "/"), data);
            set(ref(database, 'users_friend/' + customid), data);
        } else { }

    }
    window.createDisc = createDisc

    var add_file = document.getElementById("add_image")
    add_file.addEventListener('click', (e) => {
        image_render(myEmail, myName)
    });

    const form = document.getElementById('add_image');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    send.addEventListener('click', (e) => {
        var fg = document.getElementById('content').value
        var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
            var str = document.getElementById('content').value;
            document.getElementById('content').value = "";
            var str1 = str.replaceAll("<", "&lt;")
            var str2 = str1.replaceAll(">", "&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
            // send event to a function
            var mes = message_render(message, "nop")
            if (window.extensionEvent != undefined) {
                window.extensionEvent()
            }
            if (mes.startsWith('/')) {
                return;
            }
            image_render(myEmail, myName)
            set(ref(database, 'preload/' + cusid + '/Message'), {
                email: myEmail,
                allow: friend,
                type: "message",
                message: mes,
                name: myName,
                date: Date.now(),
                dname: cusid
            });
            set(ref(database, 'messages/' + cusid + '/' + id), {
                email: myEmail,
                allow: friend,
                type: "message",
                message: mes,
                name: myName,
                date: Date.now(),
                dname: cusid
            });
        } else { }
    });
    send2.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            var fg = document.getElementById('content').value
            var gh = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
                var str = document.getElementById('content').value;
                document.getElementById('content').value = "";
                var str1 = str.replaceAll("<", "&lt;")
                var str2 = str1.replaceAll(">", "&gt;")
                var message = str2;
                var name = myName;
                const id = push(child(ref(database), 'messages')).key;
                var friend = "none"
                var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat
                // send event to a function
                var mes = message_render(message, "nop")
                if (window.extensionEvent != undefined) {
                    window.extensionEvent(mes)
                }
                if (mes.startsWith('/')) {
                    return;
                }
                image_render(myEmail, myName)
                set(ref(database, 'preload/' + cusid + '/Message'), {
                    email: myEmail,
                    allow: friend,
                    type: "message",
                    message: mes,
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
                set(ref(database, 'messages/' + cusid + '/' + id), {
                    email: myEmail,
                    allow: friend,
                    type: "message",
                    message: mes,
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
            } else { }
        } else { }
    });
    function dateDifference(date) {
        const now = new Date();
        const pastDate = new Date(date);
        const seconds = Math.floor((now - pastDate) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    function formatDate(date) {
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} `;
        let formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

        return formattedDate + formattedTime;
    }

    function newMessage(data2) {
        const dnamef = data2.val().dname
        var class_added = `tooltip`

        var tooltip = `
            <span class="tooltiptext"><i onclick='showSetting(this)' class="fa-solid fa-ellipsis"></i>       ${String(dateDifference(new Date(data2.val().date), new Date()))}</span>
        `

        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
        if (data2.val().name != null) {
            if (data2.val().message != null || data2.val().message != undefined) {
                if (data2.val().type == "message" && data2.val().mtype != 'embed') {
                    if (data2.val().name != null || data2.val().name != undefined) {
                        if (message_render(data2.val().message) == null || message_render(data2.val().message) == undefined) {
                            var html = '';
                            var DateNow = '';
                        } else {
                            if (data2.val().email == myEmail) {
                                var html = `<div class="bubble me ${class_added}">${message_render(data2.val().message)} ${tooltip}</div>`
                                var DateNow = data2.val().date
                            } else {
                                url = ''
                                userdb.forEach((data) => {
                                    if (data.val().email == data2.val().email) {
                                        url = data.val().image
                                    }
                                })
                                var html = `<div class="bubble you ${class_added}"><img src="${url}" class="messageProfile"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div>${tooltip}</div>`
                                var DateNow = data2.val().date
                            }
                        }
                    } else { }
                } else if (data2.val().mtype == "embed") {
                    if (data2.val().name != null || data2.val().name != undefined) {
                        if (embed_render(data2.val().message) == null || embed_render(data2.val().message) == undefined) {
                            var html = '';
                            var DateNow = '';
                        } else {
                            if (data2.val().email == myEmail) {
                                var html = `<div class="bubble me ${class_added} embed">${embed_render(data2.val().message)} ${tooltip}</div>`
                                var DateNow = data2.val().date
                            } else {
                                var html = `<div class="bubble you ${class_added} embed"><div class="bubble-name">${data2.val().name}</div><div>${embed_render(data2.val().message)}</div>${tooltip}</div>`
                                var DateNow = data2.val().date
                            }
                        }
                    } else { }
                } else if (data2.val().type == "CDNIMAGE") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble me ${class_added}"><img onclick="big(this)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${DateNow}" data-src="${data2.val().message}"></img>${tooltip}</div>`
                    } else {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this)" class="type-img img-load-${dnamef}" data-date="${DateNow}" data-state="unload" data-src="${data2.val().message}"></img></div>${tooltip}</div>`
                    }
                } else if (data2.val().type == "new-image") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble me ${class_added}"><img onclick="big(this)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${DateNow}" data-src="data:image/${data2.val().message}"></img>${tooltip}</div>`
                    } else {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this)" class="type-img img-load-${dnamef}" data-date="${DateNow}" data-state="unload" data-src="data:image/${data2.val().message}"></img></div>${tooltip}</div>`
                    }
                } else if (data2.val().type == "encrypted") {
                    if (data2.val().name != null || data2.val().name != undefined) {
                        if (message_render(data2.val().message) == null || message_render(data2.val().message) == undefined) {
                            var html = '';
                            var DateNow = '';
                        } else {
                            if (data2.val().email == myEmail) {
                                var html = `<div class="bubble me ${class_added}">${message_render(atob(data2.val().message))} ${tooltip}</div>`
                                var DateNow = data2.val().date
                            } else {
                                var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(atob(data2.val().message))}</div>${tooltip}</div>`
                                var DateNow = data2.val().date
                            }
                        }
                    } else { }
                } else if (data2.val().type == "new-encrypted") {
                    if (data2.val().email == myEmail) {
                        var message = decrypt(data2.val().message)
                        var html = `<div class="bubble me ${class_added}" id="${data2.val().date}">${message_render(message)}${tooltip}</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(message)
                    } else {
                        var message = decrypt(data2.val().message)
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(message)}</div>${tooltip}</div>`
                        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        d1.innerHTML = d1.innerHTML + html
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(message)
                    }
                }
                else if (data2.val().type == "audio") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble me ${class_added}"><audio class="type-img img-load-${dnamef}" data-state="unload" data-date="${DateNow}" data-src="${data2.val().message}"></audio>${tooltip}</div>`
                    } else {
                        var DateNow = data2.val().date
                        var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><audio class="type-img img-load-${dnamef}" data-date="${DateNow}" data-state="unload" data-src="${data2.val().message}"></audio></div>${tooltip}</div>`
                    }
                } else { }
                try {
                    return [d1, html]
                } catch { }
            }

            else {
                return [d1, '']
            }
        }
        return [d1, '']
    }
    onChildAdded(ref(database, `user/`), (data2) => {
        window.userdb.push(data2)
    })
    window.processingMessage = []
    document.getElementById("people").addEventListener("click", (e) => {
        const el = e.target.closest("li");
        console.log(el)
        if (el.dataset.enable != "true") {
            onChildAdded(ref(database, `messages/${el.dataset.chatid}`), (data2) => {
                // To do make a list of message to load
                if (data2.val().dname == undefined) { return }
                if (data2.val().hide == true) { return }

                // loading message in memory for storage while waiting to be loaded
                try {
                    data2.val()
                } catch {
                    return;
                }
                try {
                    window.processingMessage[data2.val().dname].push([data2, false])
                } catch {
                    window.processingMessage.push(String(data2.val().dname))
                    if (typeof (window.processingMessage[String(data2.val().dname)]) != typeof ([])) {
                        window.processingMessage[String(data2.val().dname)] = []
                    }
                    window.processingMessage[String(data2.val().dname)].push([data2, false])
                }
                window.processingMessage[data2.val().dname].sort((a, b) => {
                    return a[0].val().date - b[0].val().date;
                });
            })
            onChildChanged(ref(database, `messages/${el.dataset.chatid}`), (data2) => {
                if (data2.val().dname == undefined) { return }
                // when message is edited or hide get message element and hide or chnge the content
            })
            try {
                var lastScroll = 0;
                document.getElementById("room_" + el.id.replace("d", "")).addEventListener("scroll", (e) => {
                    let currentScroll = e.target.scrollTop
                    if (currentScroll > 0 && lastScroll <= currentScroll) {
                        lastScroll = currentScroll;
                    } else {
                        lastScroll = currentScroll;
                        if (currentScroll <= ((innerHeight - 100) / 1.4)) {
                            window.MessageLoadReversed(undefined, undefined, e.target.scrollHeight)
                        }
                    }
                })

            } catch {
                console.log('event lisener wasn' + "'" + 't added. Disabled scroll event to load more msessages')
            }
            el.dataset.enable = true
            setTimeout(MessageLoad, 1000);
            setTimeout((el) => {
                el.scrollTop = el.scrollHeight;
                el.scrollTop = el.scrollHeight;
            }, 2000, el);
        }
    });
    function MessageWorkerLoop(snapshot, reversed = false, height) {
        var elem = undefined
        for (let i = 0; i < (snapshot.length); i++) {
            var data = snapshot[i]
            var data2 = data[0]
            data[1] = true
            var message = newMessage(data2)
            if (message != null || message[1] != '') {
                var d1 = message[0]
                if (elem == undefined) { var elem = d1 }
                if (reversed == false) {
                    d1.innerHTML = d1.innerHTML + message[1]
                } else {
                    d1.innerHTML = message[1] + d1.innerHTML
                }
            }
        }
        if (reversed == false) {
            elem.scrollTop = elem.scrollHeight;
            elem.scrollTop = elem.scrollHeight;
        } else if (height != 0) {
            try {
                elem.scrollTop = elem.scrollHeight - height;
            } catch { }
        }
        return snapshot
    }
    function findAll(findFunc, object) {
        var d = []
        if (object == undefined) {
            return d
        }
        for (let i = 0; i < (object.length); i++) {
            if (findFunc(object[i])) {
                d.push(object[i])
            }
        }
        return d
    }
    window.findAll = findAll
    window.MessageWorkerLoop = MessageWorkerLoop
    function sortArrayByDate(array) {
        return array.sort((a, b) => {
            const dateA = new Date(a[0].val().date).getTime();
            const dateB = new Date(b[0].val().date).getTime();
            return dateA - dateB;
        });
    }

    async function MessageWorker(select, max, reversed = false, height) {
        if (max == undefined) {
            max = 20
        }
        for (let i = 0; i < (window.processingMessage.length / 2); i++) {
            var err = false
            // generate new array with the date pre made
            var narray = sortArrayByDate(window.processingMessage[window.processingMessage[i]])
            window.processingMessage[window.processingMessage[i]] = narray
            try {
                findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]])
                var err = true
            } catch {
                var err = false
            } if (err) {
                if (select != undefined && select == i) {
                    if (findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]]).length > max) {
                        var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]]).slice().reverse().slice(0, max).reverse()
                    } else {
                        var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]]).slice().reverse()
                    }
                    var ActualMessages = window.processingMessage[localStorage.getItem('lastChat')]
                    var date1 = new Date(ActualMessages[0][0].val().date).getTime()
                    var date2 = new Date(ActualMessages[ActualMessages.length - 1][0].val().date).getTime()
                    var autoReversed = date1 < date2
                } else if (localStorage.getItem('lastChat') == i) {
                    if (findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).length > max) {
                        var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice().reverse().slice(0, max).reverse()
                    } else {
                        var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice().reverse()
                    }
                    var ActualMessages = window.processingMessage[localStorage.getItem('lastChat')]
                    var date1 = new Date(ActualMessages[1][0].val().date).getTime()
                    var date2 = new Date(ActualMessages[ActualMessages.length - 1][0].val().date).getTime()
                    var autoReversed = date1 < date2
                }
                if (findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).length > max) {
                    var ActualMessages = window.processingMessage[localStorage.getItem('lastChat')]
                    var date1 = new Date(ActualMessages[1][0].val().date).getTime()
                    var date2 = new Date(ActualMessages[ActualMessages.length - 1][0].val().date).getTime()
                    var autoReversed = date1 < date2
                    var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice().reverse().slice(0, max).reverse()
                } else {
                    var ActualMessages = window.processingMessage[localStorage.getItem('lastChat')]
                    try {
                        var date1 = new Date(ActualMessages[1][0].val().date).getTime()
                        var date2 = new Date(ActualMessages[ActualMessages.length - 1][0].val().date).getTime()
                        var autoReversed = date1 < date2
                    } catch {
                        var autoReversed = false
                    }
                    var snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice()
                }
                if (autoReversed == undefined) {
                    var autoReversed = false
                }
                if (reversed) {
                    var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), true, height)
                    window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat((window.processingMessage[window.processingMessage[i]].slice(snapshot.length)))
                } else {
                    if (autoReversed) {
                        var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), false, height)
                        window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat((window.processingMessage[window.processingMessage[i]].slice(snapshot.length)))
                    } else {
                        var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), true, height)
                        window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat(window.processingMessage[window.processingMessage[i]].slice(snapshot.length))
                    }
                }
            }
        }
    }
    window.MessageWorker = MessageWorker
    window.newMessage = newMessage
    function MessageLoad(select, max, reversed = false) {
        MessageWorker(select, max, reversed)
        //worker.postMessage('called')
    }
    // reversed
    function MessageLoadReversed(select, max, height) {
        MessageWorker(select, max, true, height)
        //worker.postMessage('called')
    }
    window.MessageLoadReversed = MessageLoadReversed
    window.MessageLoad = MessageLoad

    function hidediscusionintern(id) {
        var hider = () => {
            const dbRef = ref(getDatabase())
            const updates = {};
            updates[`users_friend/${id}/hide`] = true;
            update(dbRef, updates);
        }
        CustomAlert('Confirm', 'Please comfirm you want to hide this diccsuion', hider, 'ok | cancel')
    }
    window.hidediscusionintern = hidediscusionintern

    function createInviteDiscusionIntern() {
        var id = push(child(ref(database), 'invites')).key;
        var cusid = localStorage.getItem('lastChat')
        set(ref(database, 'invites/' + id), {
            email: myEmail,
            allow: 'everyone',
            type: "invite",
            message: message_render('Do you want to get in this conversation ? From ' + myName, "nop"),
            name: myName,
            inviteid: id,
            date: Date.now(),
            dname: cusid
        });
        return id
    }
    window.createInviteDiscusionIntern = createInviteDiscusionIntern

    function CustomAlert(message, title, callback, but = "ok") {
        // but can be "ok|cancel" or just "ok" (ok callback by default)
        document.body.innerHTML += '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');
        let winH = window.innerHeight;

        dialogoverlay.style.height = winH + "px";
        dialogbox.style.top = "100px";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";

        // Set title or hide it if undefined
        let dialogboxhead = document.getElementById('dialogboxhead');
        if (typeof title === 'undefined' || title === '') {
            dialogboxhead.style.display = 'none';
        } else {
            dialogboxhead.style.display = 'block';
            dialogboxhead.innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        }

        // Set message content
        document.getElementById('dialogboxbody').innerHTML = message;

        // Split the button text into OK and Cancel (if provided)
        let buttonTexts = but.split("|");
        let okText = buttonTexts[0] || "OK"; // Default "OK" if no text provided
        let cancelText = buttonTexts[1] || null;

        // Set footer and buttons
        let dialogboxfoot = document.getElementById('dialogboxfoot');
        function closeDialog() {
            dialogbox.style.display = 'none';
            dialogoverlay.style.display = 'none';
        }
        if (cancelText) {
            dialogboxfoot.innerHTML = `
                    <button class="pure-material-button-contained" onclick="(function() {
            document.getElementById('dialogbox').style.display = 'none';
            document.getElementById('dialogoverlay').style.display = 'none'; ${callback ? callback : ''})()">${okText}}</button>
                    <button class="pure-material-button-contained" onclick="(function() {
            document.getElementById('dialogbox').style.display = 'none';
            document.getElementById('dialogoverlay').style.display = 'none';)()">${cancelText}</button>
                `;
        } else {
            dialogboxfoot.innerHTML = `
                    <button class="pure-material-button-contained active" onclick="(function() {
            document.getElementById('dialogbox').style.display = 'none';
            document.getElementById('dialogoverlay').style.display = 'none';)()">${okText}</button>
                `;
        }
    }

    window.CustomAlert = CustomAlert
    function waitInternetLoader(repeatTime) {
        CustomAlert('You are offline !', 'No internet')
        var interval = setInterval(() => {
            if (navigator.onLine) {
                console.log("Stopping Repeater");
                clearInterval(interval)
            } else {
                console.log("User Offline repeating");
            }
        }, repeatTime)
    }
    window.addEventListener("offline", (e) => {
        window.waitInternetLoader(1000)
        console.log("offline");
    });
    window.addEventListener("online", (e) => {
        setTimeout(() => {
            if (navigator.onLine) {
                location.reload()
            }
        }, 1000);
        console.log("online");
    });

    window.waitInternetLoader = waitInternetLoader

    function changeDisplayNameIntern(id, newDisplayName) {
        const dbRef = ref(getDatabase())
        const updates = {};
        updates[`users_friend/${id}/displayName`] = newDisplayName;
        update(dbRef, updates);
    }
    window.changeDisplayNameIntern = changeDisplayNameIntern

    function changeMessageContentIntern(id, messageID, newValue) {
        const dbRef = ref(getDatabase())
        const updates = {};
        updates[`'messages/'${id}/${messageID}/message`] = newValue;
        update(dbRef, updates);
    }

    window.changeMessageContentIntern = changeMessageContentIntern

    function hideMessageInter(id, messageID) {
        const dbRef = ref(getDatabase())
        const updates = {};
        updates[`'messages/'${id}/${messageID}/hide`] = True;
        update(dbRef, updates);
    }

    window.hideMessageInter = hideMessageInter

    const friend_invite = ref(database, 'users_friend/');
    onChildAdded(friend_invite, (data) => {
        if (data.val().hide == true) {
            return
        }
        var dte = data.val().allow
        try {
            dte.indexOf(myEmail)
        } catch {
            return
        }
        if (dte.indexOf(myEmail) != -1 && dte != `,${myEmail}`) {
            var array = window.userdb
            var object = []
            var last = []
            for (let i = 0; i < array.length; i++) {
                try {
                    if (array.find(obj => obj.val().email === data.val().allow[i]).val().image != undefined) {
                        object.push(array.find(obj => obj.val().email === data.val().allow[i]))
                    }
                    else if (array.find(obj => obj.val().email === data.val().allow[i]).val().name == undefined) {
                        object.push({
                            val: () => {
                                return { email: data.val().allow[i], image: "img/default.png" }
                            }
                        })
                    } else {
                        object.push(array.find(obj => obj.val().email === data.val().allow[i]))
                    }
                } catch (err) {
                    object.push({
                        val: () => {
                            return { email: data.val().allow[i], image: "img/default.png" }
                        }
                    })
                }
            }
            for (let i = 0; i < object.length; i++) {
                if (object[i] == undefined) {
                    object[i] = {
                        val: () => {
                            return { email: data.val().allow[i], image: "img/default.png" }
                        }
                    }
                }
                last.push(object[i].val().name)
            }
            var n_allow = last
            try {
                var new_allow = n_allow.join(" ")
                var nwe_allow = new_allow.replace(myEmail, "")
                var nwe_allow = nwe_allow.replace(myName, "")
                var nw_allow = nwe_allow.replaceAll(",", " ")
            } catch {
                var nw_allow = n_allow
            }
            if (nw_allow.replaceAll(" ", "") == "") {
                n_allow = data.val().allow
                try {
                    var new_allow = n_allow.join(" ")
                    var nwe_allow = new_allow.replace(myEmail, "")
                    var nwe_allow = nwe_allow.replace(myName, "")
                    var nw_allow = nwe_allow.replaceAll(",", " ")
                } catch {
                    var nw_allow = n_allow
                }
            }

            if (object[0].val().email != myEmail) {
                object.reverse()
            }
            if (data.val().displayName == undefined) {
                var displayName = nw_allow
            } else {
                var displayName = data.val().displayName
            }
            url = 'img/default.png'
            window.userdb.forEach((data) => {
                if (data.val().email == data2.val().email) {
                    url = data.val().image
                }
            })

            try {
                if (last[0] != undefined && nw_allow != "") {
                    var html = `
            <li onclick="room('${data.val().dname}')" class="people-person" data-name="${data.val().allow}" data-chatid="${data.val().dname}" id="d${data.val().dname}">
            <img src="${url}" class="people-img"alt="picture" />
            <p id="name_${data.val().allow}" class="people-name"><input is="expanding-list" id="rename_${data.val().dname}" class='rename-file' type="text"/>${displayName}</p>
            <p id="time_${data.val().dname}" data-send="${data.val().dname}" class="people-time">N/A</p>
            <p class='people-setting popmenu'><popup-setting-menu></popup-setting-menu></p>
            <p id="prew_${data.val().dname}" class="people-preview">Nothing to show</p>
            </li>`
                } else {
                    var html = `
                <li onclick="room('${data.val().dname}',event)" class="people-person" data-name="${data.val().allow}" data-chatid="${data.val().dname}" id="d${data.val().dname}">
                <img src${url} class="people-img"alt="picture" />
                <p id="name_${data.val().allow}" class="people-name"><input is="expanding-list" id="rename_${data.val().dname}" class='rename-file' type="text"/>${displayName}</p>
                <p id="time_${data.val().dname}" data-send="${data.val().dname}" class="people-time">N/A</p>
                <p class='people-setting popmenu'><popup-setting-menu></popup-setting-menu></p>
                <p id="prew_${data.val().dname}" class="people-preview">Nothing to show</p>
                </li>`
                }
            } catch {
                var html = `
                <li onclick="room('${data.val().dname}',event)" class="people-person" data-name="${data.val().allow}" data-chatid="${data.val().dname}" id="d${data.val().dname}">
                <img src${url} class="people-img"alt="picture" />
                <p id="name_${data.val().allow}" class="people-name"><input is="expanding-list" id="rename_${data.val().dname}" class='rename-file' type="text"/>${displayName}</p>
                <p id="time_${data.val().dname}" data-send="${data.val().dname}" class="people-time">N/A</p>
                <p class='people-setting'><popup-setting-menu></popup-setting-menu></p>
                <p id="prew_${data.val().dname}" class="people-preview">Nothing to show</p>
                </li>`
            }
            // chat_el_box
            var html_chat = `
        <div class="chat" id="room_${data.val().dname}" data-chat="${data.val().dname}">
        <span></span>
        </div>`
            const d1 = document.getElementById("chat_el_box")
            const d2 = document.getElementById("people")
            d1.innerHTML = d1.innerHTML + html_chat
            d2.innerHTML = d2.innerHTML + html
            const dnamef = data.val().dname
            Storage.prototype.setObj = function (key, obj) {
                return this.setItem(key, JSON.stringify(obj))
            }
            Storage.prototype.getObj = function (key) {
                return JSON.parse(this.getItem(key))
            }
            onChildChanged(ref(database, 'preload/' + dnamef), (data2) => {
                bip()
                if (data2.val().type == "call") {
                    window.receive(`?f&type=call&uuid=${data2.val().message}&name=${data2.val().name}&`)
                    new Notification(data2.val().name, { body: message_render(`${data2.val().name} is calling you on IC-hat`), requireInteraction: true }).onclick = (() => { window.focus(); console.log("d") })
                } else if (data2.val().name != null && data2.val().type == "message") {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    } else {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        document.getElementById(`time_${dnamef}`).innerHTML = date
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                        sendNotif(data2.val().name + ': ' + message_render(data2.val().message))
                    }
                    setTimeout((data2) => {
                        // display message in diccusion
                        console.log(data2.val().type)
                        var message = newMessage(data2)
                        console.log(message)
                        if (message != None) {
                            var d1 = message[0]
                            d1.innerHTML = d1.innerHTML + message[1]
                            var elem = d1
                            elem.scrollTop = elem.scrollHeight;
                            elem.scrollTop = elem.scrollHeight;
                        }
                        // find the message in local DB to be set as loaded
                        var cache = window.processingMessage[data2.val().dname]
                        cache[cache.length - 1][1] = true
                        console.log(data2)
                    }, 1000, data2)
                }
            })
            onChildAdded(ref(database, 'preload/' + dnamef), async (data2) => {
                if (data2.val().name != null && data2.val().type == "message" && data2.val().message != null) {
                    if (data2.val().email == myEmail) {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        try {
                            document.getElementById(`time_${dnamef}`).innerHTML = date
                            document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                        } catch {
                            setTimeout(() => {
                                document.getElementById(`time_${dnamef}`).innerHTML = message_date(DateNow, dnamef)
                                document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                            }, 1000)
                        }
                    } else {
                        var DateNow = data2.val().date
                        var date = message_date(DateNow, dnamef)
                        try {
                            document.getElementById(`time_${dnamef}`).innerHTML = date
                        } catch { }
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message)
                    }
                }
            })
            setTimeout(() => {
                window.removeEmptyP()
            }, 100);
        } else { }
    });
} catch (err) {
    console.log(err)
}
