import { setCookie, bip, removeloader, getuser, message_date, message_render, embed_render, decrypt } from "./functions.js";
import { sendNotif, accesPush } from './notification.js';
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

localStorage.setItem("state", "no");
var Imageupload = window.Imageupload;

const firebaseConfig = {
    apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
    authDomain: "ic-hat.firebaseapp.com",
    databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
    projectId: "ic-hat",
    storageBucket: "ic-hat.appspot.com",
    messagingSenderId: "720687529085",
    appId: "1:720687529085:web:2d964e880c5e2398058514",
    measurementId: "G-YC8K0D7GLR"
};

const None = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('profnity.js').then(registration => {
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

accesPush();

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
window.appFire = app;
window.databaseFire = database;
window.userdb = [];

setTimeout(removeloader, 1000);

(async () => {
    var myData = await getuser();
    if (myData != null) {
        var myEmail = myData.email;
        var myName = myData.user_metadata.full_name;
        var myImage = myData.user_metadata.avatar_url;

        document.getElementById("user_name").innerText = myName;

        var data = {
            name: myName,
            email: myEmail,
            image: myImage
        };

        try {
            set(ref(database, 'user/' + myEmail.replace(/\W/g, '')), data);
        } catch {
            data.image = 'img/default.png';
            set(ref(database, 'user/' + myEmail.replace(/\W/g, '')), data);
        }

        if (myImage != null && myImage != '\n') {
            document.getElementById("user_pic").src = myImage;
            document.getElementById("user_picture_img").src = myImage;
        } else {
            document.getElementById("user_pic").src = "img/default.png";
        }

        setCookie("email", myEmail);
        setCookie("name", myName);
        document.getElementById("not-connected").remove();
    } else {
        document.getElementById("connected").remove();
        location.replace(window.location.origin);
    }
})();

export function fromHTML(html, trim = true, id) {
    html = trim ? html.trim() : html;
    if (!html) return null;

    const template = document.createElement('template');
    template.innerHTML = html;
    template.id = id;
    const result = template.content.children;

    return result.length === 1 ? result[0] : result;
}

export async function resizeImage(dataUrl, targetFileSizeKb, maxDeviation = 1) {
    let originalFile = await urltoFile(dataUrl, 'test.png', 'image/png');
    if (originalFile.size / 1000 < targetFileSizeKb) return dataUrl;

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
        } else if (file.size / 1000 > targetFileSizeKb) {
            high = middle;
        }

        middle = (low + high) / 2;
        result = canvas.toDataURL();
    }

    return result;
}

export function print(text) {
    event.preventDefault();
    console.log(text);
}

export function urltoFile(url, filename, mimeType) {
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
}

export function filetoUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export function image_render(email, name) {
    var myName = name;
    var filelist = document.getElementById("file_input").files;
    Object.keys(filelist).forEach(key => {
        var file = document.getElementById("file_input").files[key];
        Imageupload(file, (imgurl) => {
            var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat;
            const id = push(child(ref(database), 'messages')).key;
            set(ref(database, "messages/" + cusid + "/" + id), {
                email: email,
                name: myName,
                friend: "none",
                type: "CDNIMAGE",
                message: imgurl,
                date: Date.now(),
                dname: cusid
            });
            document.getElementById("file").style.display = "none";
            document.getElementById("file_input").value = "";
        });
    });
}

try {
    const send = document.getElementById("send");
    const send2 = document.getElementById("content");
    const friends = document.getElementById("new_friend_add");
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("new_friend");
    const span = document.getElementsByClassName("close")[0];
    const modal2 = document.getElementById("file");
    const btn2 = document.getElementById("add_file");
    const span2 = document.getElementsByClassName("close")[1];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    btn2.onclick = function () {
        modal2.style.display = "block";
    };

    span2.onclick = function () {
        modal2.style.display = "none";
    };

    window.onclick = function (event) {
        window.ev = event;
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target.parentElement.tagName.toLowerCase() != 'popup-setting-menu') {
            allclose();
            allclose1();
        }
    };

    friends.addEventListener('click', (e) => {
        if (document.getElementById("friend_email").value == "") {
            var list = document.querySelectorAll(".check");
            if (list != undefined) {
                var fg = Array.from(list).map(item => item.id).join(",");
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail));
                var allow = fg.split(" ").filter(item => item.includes("@"));
                var data = { allow, dname: customid };
                document.getElementById("firend_list_preview").innerHTML = "";
            }
        } else {
            var fg = document.getElementById('friend_email').value;
            if (fg.trim() != "") {
                var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail));
                var allow = fg.split(",").filter(item => item.includes("@"));
                var data = { allow, dname: customid };
                set(ref(database, 'messages/' + customid + "/"), data);
                set(ref(database, 'users_friend/' + customid), data);
                document.getElementById('friend_email').value = "";
                modal.style.display = "none";
            }
        }
    });

    function createDisc(fg) {
        if (fg.trim() != "") {
            var customid = String(btoa(fg) + btoa(fg.replace(/\s/g, '').length) + btoa(myEmail));
            var allow = fg.split(",").filter(item => item.includes("@"));
            var data = { allow, dname: customid };
            set(ref(database, 'messages/' + customid + "/"), data);
            set(ref(database, 'users_friend/' + customid), data);
        }
    }

    window.createDisc = createDisc;

    var add_file = document.getElementById("add_image");
    add_file.addEventListener('click', (e) => {
        image_render(myEmail, myName);
    });

    const form = document.getElementById('add_image');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    send.addEventListener('click', (e) => {
        var message = document.getElementById('content').value.trim();
        if (message != "") {
            var str = message.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
            document.getElementById('content').value = "";
            var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat;
            var mes = message_render(str, "nop");
            if (mes.startsWith('/')) return;

            const id = push(child(ref(database), 'messages')).key;
            set(ref(database, 'preload/' + cusid + '/Message'), {
                email: myEmail,
                allow: "none",
                type: "message",
                message: mes,
                name: myName,
                date: Date.now(),
                dname: cusid
            });
            set(ref(database, 'messages/' + cusid + '/' + id), {
                email: myEmail,
                allow: "none",
                type: "message",
                message: mes,
                name: myName,
                date: Date.now(),
                dname: cusid
            });
        }
    });

    send2.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            var message = document.getElementById('content').value.trim();
            if (message != "") {
                var str = message.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                document.getElementById('content').value = "";
                var cusid = document.getElementsByClassName('chat active-chat')[0].dataset.chat;
                var mes = message_render(str, "nop");
                if (mes.startsWith('/')) return;

                const id = push(child(ref(database), 'messages')).key;
                set(ref(database, 'preload/' + cusid + '/Message'), {
                    email: myEmail,
                    allow: "none",
                    type: "message",
                    message: mes,
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
                set(ref(database, 'messages/' + cusid + '/' + id), {
                    email: myEmail,
                    allow: "none",
                    type: "message",
                    message: mes,
                    name: myName,
                    date: Date.now(),
                    dname: cusid
                });
            }
        }
    });

    function dateDifference(date) {
        const now = new Date();
        const pastDate = new Date(date);
        const seconds = Math.floor((now - pastDate) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years";

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months";

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days";

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours";

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes";

        return Math.floor(seconds) + " seconds";
    }

    function formatDate(date) {
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} `;
        let formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate + formattedTime;
    }

    function newMessage(data2) {
        const dnamef = data2.val().dname;
        var class_added = `tooltip`;
        var tooltip = `<span class="tooltiptext"><i onclick='showSetting(this)' class="fa-solid fa-ellipsis"></i> ${dateDifference(new Date(data2.val().date), new Date())}</span>`;
        const d1 = document.querySelector(`[data-chat="${dnamef}"]`);

        if (data2.val().name != null && data2.val().message != null) {
            if (data2.val().type == "message" && data2.val().mtype != 'embed') {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}">${message_render(data2.val().message)} ${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div>${tooltip}</div>`;
                return [d1, html];
            } else if (data2.val().mtype == "embed") {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added} embed">${embed_render(data2.val().message)} ${tooltip}</div>`
                    : `<div class="bubble you ${class_added} embed"><div class="bubble-name">${data2.val().name}</div><div>${embed_render(data2.val().message)}</div>${tooltip}</div>`;
                return [d1, html];
            } else if (data2.val().type == "CDNIMAGE") {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}"><img onclick="big(this)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${data2.val().date}" data-src="${data2.val().message}"></img>${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this)" class="type-img img-load-${dnamef}" data-date="${data2.val().date}" data-state="unload" data-src="${data2.val().message}"></img></div>${tooltip}</div>`;
                return [d1, html];
            } else if (data2.val().type == "new-image") {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}"><img onclick="big(this)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${data2.val().date}" data-src="data:image/${data2.val().message}"></img>${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this)" class="type-img img-load-${dnamef}" data-date="${data2.val().date}" data-state="unload" data-src="data:image/${data2.val().message}"></img></div>${tooltip}</div>`;
                return [d1, html];
            } else if (data2.val().type == "encrypted") {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}">${message_render(atob(data2.val().message))} ${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(atob(data2.val().message))}</div>${tooltip}</div>`;
                return [d1, html];
            } else if (data2.val().type == "new-encrypted") {
                var message = decrypt(data2.val().message);
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}" id="${data2.val().date}">${message_render(message)}${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(message)}</div>${tooltip}</div>`;
                const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
                var date = message_date(data2.val().date, dnamef);
                d1.innerHTML = d1.innerHTML + html;
                document.getElementById(`time_${dnamef}`).innerHTML = date;
                document.getElementById(`prew_${dnamef}`).innerHTML = message_render(message);
                return [d1, html];
            } else if (data2.val().type == "audio") {
                var html = data2.val().email == myEmail
                    ? `<div class="bubble me ${class_added}"><audio class="type-img img-load-${dnamef}" data-state="unload" data-date="${data2.val().date}" data-src="${data2.val().message}"></audio>${tooltip}</div>`
                    : `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><audio class="type-img img-load-${dnamef}" data-date="${data2.val().date}" data-state="unload" data-src="${data2.val().message}"></audio></div>${tooltip}</div>`;
                return [d1, html];
            }
        }
        return [d1, ''];
    }

    onChildAdded(ref(database, `user/`), (data2) => {
        window.userdb.push(data2);
    });

    window.processingMessage = [];

    document.getElementById("people").addEventListener("click", (e) => {
        const el = e.target.closest("li");
        if (el && el.dataset.enable != "true") {
            onChildAdded(ref(database, `messages/${el.dataset.chatid}`), (data2) => {
                if (!data2.val().dname || data2.val().ide || data2.val().hide) return;

                try {
                    if (!window.processingMessage[data2.val().dname]) {
                        window.processingMessage[data2.val().dname] = [];
                    }
                    window.processingMessage[data2.val().dname].push([data2, false]);
                    window.processingMessage[data2.val().dname].sort((a, b) => a.val().date.localeCompare(b.val().date));
                } catch {
                    window.processingMessage.push(String(data2.val().dname));
                    if (!Array.isArray(window.processingMessage[String(data2.val().dname)])) {
                        window.processingMessage[String(data2.val().dname)] = [];
                    }
                    window.processingMessage[String(data2.val().dname)].push([data2, false]);
                    window.processingMessage[data2.val().dname].sort((a, b) => a.val().date.localeCompare(b.val().date));
                }
            });

            onChildChanged(ref(database, `messages/${el.dataset.chatid}`), (data2) => {
                if (!data2.val().dname) return;
            });

            try {
                var lastScroll = 0;
                document.getElementById("room_" + el.id.replace("d", "")).addEventListener("scroll", (e) => {
                    let currentScroll = e.target.scrollTop;
                    if (currentScroll > 0 && lastScroll <= currentScroll) {
                        lastScroll = currentScroll;
                    } else {
                        lastScroll = currentScroll;
                        if (currentScroll <= ((innerHeight - 100) / 1.4)) {
                            window.MessageLoadReversed(undefined, undefined, e.target.scrollHeight);
                        }
                    }
                });
            } catch {
                console.log('Event listener wasn\'t added. Disabled scroll event to load more messages');
            }

            el.dataset.enable = true;
            setTimeout(MessageLoad, 1000);
            setTimeout((el) => {
                el.scrollTop = el.scrollHeight;
            }, 2000, el);
        }
    });

    function MessageWorkerLoop(snapshot, reversed = false, height) {
        var elem = undefined;
        for (let i = 0; i < snapshot.length; i++) {
            var data = snapshot[i];
            var data2 = data[0];
            data[1] = true;
            var message = newMessage(data2);
            if (message && message[1]) {
                var d1 = message[0];
                if (!elem) elem = d1;
                if (reversed) {
                    d1.innerHTML += message[1];
                } else {
                    d1.innerHTML = message[1] + d1.innerHTML;
                }
            }
        }
        if (!reversed) {
            elem.scrollTop = elem.scrollHeight;
        } else if (height) {
            try {
                elem.scrollTop = elem.scrollHeight - height;
            } catch { }
        }
        return snapshot;
    }

    function findAll(findFunc, object) {
        var d = [];
        if (!object) return d;
        for (let i = 0; i < object.length; i++) {
            if (findFunc(object[i])) {
                d.push(object[i]);
            }
        }
        return d;
    }

    window.findAll = findAll;
    window.MessageWorkerLoop = MessageWorkerLoop;

    function sortArrayByDate(array) {
        return array.sort((a, b) => new Date(a[0].val().date).getTime() - new Date(b[0].val().date).getTime());
    }

    async function MessageWorker(select, max = 20, reversed = false, height) {
        for (let i = 0; i < (window.processingMessage.length / 2); i++) {
            var err = false;
            var narray = sortArrayByDate(window.processingMessage[window.processingMessage[i]]);
            window.processingMessage[window.processingMessage[i]] = narray;
            try {
                findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]]);
                err = true;
            } catch {
                err = false;
            }
            if (err) {
                var snapshot;
                if (select != undefined && select == i) {
                    snapshot = findAll((obj => obj[1] !== true), window.processingMessage[window.processingMessage[i]]).slice().reverse().slice(0, max).reverse();
                } else if (localStorage.getItem('lastChat') == i) {
                    snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice().reverse().slice(0, max).reverse();
                }
                if (!snapshot) {
                    snapshot = findAll((obj => obj[1] !== true), window.processingMessage[localStorage.getItem('lastChat')]).slice();
                }
                var autoReversed = new Date(snapshot[0][0].val().date).getTime() < new Date(snapshot[snapshot.length - 1][0].val().date).getTime();
                if (reversed) {
                    var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), true, height);
                    window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat(window.processingMessage[window.processingMessage[i]].slice(snapshot.length));
                } else {
                    if (autoReversed) {
                        var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), false, height);
                        window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat(window.processingMessage[window.processingMessage[i]].slice(snapshot.length));
                    } else {
                        var resultSnapshot = MessageWorkerLoop(snapshot.slice(0, snapshot.length), true, height);
                        window.processingMessage[window.processingMessage[i]] = resultSnapshot.concat(window.processingMessage[window.processingMessage[i]].slice(snapshot.length));
                    }
                }
            }
        }
    }

    window.MessageWorker = MessageWorker;
    window.newMessage = newMessage;

    function MessageLoad(select, max, reversed = false) {
        MessageWorker(select, max, reversed);
    }

    function MessageLoadReversed(select, max, height) {
        MessageWorker(select, max, true, height);
    }

    window.MessageLoadReversed = MessageLoadReversed;
    window.MessageLoad = MessageLoad;

    function hidediscusionintern(id) {
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`users_friend/${id}/hide`] = true;
        update(dbRef, updates);
    }

    window.hidediscusionintern = hidediscusionintern;

    function createInviteDiscusionIntern() {
        var id = push(child(ref(database), 'invites')).key;
        var cusid = localStorage.getItem('lastChat');
        set(ref(database, 'invites/' + id), {
            email: myEmail,
            allow: 'everyone',
            type: "invite",
            message: message_render('Do you want to get in this conversation? From ' + myName, "nop"),
            name: myName,
            inviteid: id,
            date: Date.now(),
            dname: cusid
        });
        return id;
    }

    window.createInviteDiscusionIntern = createInviteDiscusionIntern;

    function CustomAlert(message, title, element) {
        document.body.innerHTML += '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');

        let winH = window.innerHeight;
        dialogoverlay.style.height = winH + "px";

        dialogbox.style.top = "100px";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";

        document.getElementById('dialogboxhead').style.display = title ? 'block' : 'none';

        if (title) {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="(() => {document.getElementById(\'dialogbox\').style.display = \'none\';document.getElementById(\'dialogoverlay\').style.display = \'none\';})()">OK</button>';
    }

    window.CustomAlert = CustomAlert;

    function waitInternetLoader(repeatTime) {
        CustomAlert('You are offline!', 'No internet');
        var interval = setInterval(() => {
            if (navigator.onLine) {
                console.log("Stopping Repeater");
                clearInterval(interval);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                console.log("User Offline repeating");
            }
        }, repeatTime);
    }

    window.addEventListener("offline", (e) => {
        window.waitInternetLoader(1000);
        console.log("offline");
    });

    window.addEventListener("online", (e) => {
        setTimeout(() => {
            if (navigator.onLine) {
                location.reload();
            }
        }, 1000);
        console.log("online");
    });

    window.waitInternetLoader = waitInternetLoader;

    function changeDisplayNameIntern(id, newDisplayName) {
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`users_friend/${id}/displayName`] = newDisplayName;
        update(dbRef, updates);
    }

    window.changeDisplayNameIntern = changeDisplayNameIntern;

    function changeMessageContentIntern(id, messageID, newValue) {
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`messages/${id}/${messageID}/message`] = newValue;
        update(dbRef, updates);
    }

    window.changeMessageContentIntern = changeMessageContentIntern;

    function hideMessageInter(id, messageID) {
        const dbRef = ref(getDatabase());
        const updates = {};
        updates[`messages/${id}/${messageID}/hide`] = true;
        update(dbRef, updates);
    }

    window.hideMessageInter = hideMessageInter;

    const friend_invite = ref(database, 'users_friend/');
    onChildAdded(friend_invite, (data) => {
        if (data.val().hide) return;

        var dte = data.val().allow;
        if (!dte.includes(myEmail) || dte == `,${myEmail}`) return;

        var array = window.userdb;
        var object = [];
        var last = [];

        for (let i = 0; i < array.length; i++) {
            try {
                if (array.find(obj => obj.val().email === data.val().allow[i]).val().image != undefined) {
                    object.push(array.find(obj => obj.val().email === data.val().allow[i]));
                } else if (array.find(obj => obj.val().email === data.val().allow[i]).val().name == undefined) {
                    object.push({
                        val: () => {
                            return { email: data.val().allow[i], image: "img/default.png" };
                        }
                    });
                } else {
                    object.push(array.find(obj => obj.val().email === data.val().allow[i]));
                }
            } catch (err) {
                object.push({
                    val: () => {
                        return { email: data.val().allow[i], image: "img/default.png" };
                    }
                });
            }
        }

        for (let i = 0; i < object.length; i++) {
            if (!object[i]) {
                object[i] = {
                    val: () => {
                        return { email: data.val().allow[i], image: "img/default.png" };
                    }
                };
            }
            last.push(object[i].val().name);
        }

        var n_allow = last;
        var new_allow = n_allow.join(" ").replace(myEmail, "").replace(myName, "").replaceAll(",", " ");

        if (new_allow.replaceAll(" ", "") == "") {
            n_allow = data.val().allow;
            new_allow = n_allow.join(" ").replace(myEmail, "").replace(myName, "").replaceAll(",", " ");
        }

        if (object[0].val().email != myEmail) {
            object.reverse();
        }

        var displayName = data.val().displayName || new_allow;

        var html = `
            <li onclick="room('${data.val().dname}')" class="people-person" data-name="${data.val().allow}" data-chatid="${data.val().dname}" id="d${data.val().dname}">
                <img src="${last[1] ? last[1].val().image : 'img/default.png'}" class="people-img" alt="picture" />
                <p id="name_${data.val().allow}" class="people-name"><input is="expanding-list" id="rename_${data.val().dname}" class='rename-file' type="text"/>${displayName}</p>
                <p id="time_${data.val().dname}" data-send="${data.val().dname}" class="people-time"></p>
                <p class='people-setting popmenu'><popup-setting-menu></popup-setting-menu></p>
                <p id="prew_${data.val().dname}" class="people-preview"></p>
            </li>`;

        var html_chat = `
            <div class="chat" id="room_${data.val().dname}" data-chat="${data.val().dname}">
                <span></span>
            </div>`;

        const d1 = document.getElementById("chat_el_box");
        const d2 = document.getElementById("people");
        d1.innerHTML += html_chat;
        d2.innerHTML += html;
        const dnamef = data.val().dname;

        Storage.prototype.setObj = function (key, obj) {
            return this.setItem(key, JSON.stringify(obj));
        };

        Storage.prototype.getObj = function (key) {
            return JSON.parse(this.getItem(key));
        };

        onChildChanged(ref(database, 'preload/' + dnamef), (data2) => {
            bip();
            if (data2.val().type == "call") {
                window.receive(`?f&type=call&uuid=${data2.val().message}&name=${data2.val().name}&`);
                new Notification(data2.val().name, { body: message_render(`${data2.val().name} is calling you on IC-hat`), requireInteraction: true }).onclick = (() => { window.focus(); });
            } else if (data2.val().name != null && data2.val().type == "message") {
                var date = message_date(data2.val().date, dnamef);
                document.getElementById(`time_${dnamef}`).innerHTML = date;
                document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message);
                if (data2.val().email != myEmail) {
                    sendNotif(data2.val().name + ': ' + message_render(data2.val().message));
                }
                setTimeout((data2) => {
                    var message = newMessage(data2);
                    if (message) {
                        var d1 = message[0];
                        d1.innerHTML += message[1];
                        var elem = d1;
                        elem.scrollTop = elem.scrollHeight;
                    }
                    var cache = window.processingMessage[data2.val().dname];
                    cache[cache.length - 1][1] = true;
                }, 1000, data2);
            }
        });

        onChildAdded(ref(database, 'preload/' + dnamef), async (data2) => {
            if (data2.val().name != null && data2.val().type == "message" && data2.val().message != null) {
                var date = message_date(data2.val().date, dnamef);
                try {
                    document.getElementById(`time_${dnamef}`).innerHTML = date;
                    document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message);
                } catch {
                    setTimeout(() => {
                        document.getElementById(`time_${dnamef}`).innerHTML = message_date(data2.val().date, dnamef);
                        document.getElementById(`prew_${dnamef}`).innerHTML = message_render(data2.val().message);
                    }, 1000);
                }
            }
        });

        setTimeout(() => {
            window.removeEmptyP();
        }, 100);
    });
} catch (err) {
    console.log(err);
}

function allclose() {
    var elements = document.getElementsByClassName('context-menu');
    for (let index = 0; index < elements.length; index++) {
        var element = elements[index];
        if (element.style.visibility != "hidden") {
            element.style.visibility = "hidden";
        }
    }
}

function allclose1() {
    var elements = document.getElementsByClassName('rename-active');
    for (let index = 0; index < elements.length; index++) {
        var element = elements[index];
        element.classList.remove('rename-active');
    }
}
