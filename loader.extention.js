import { getCookie, getuser } from "./functions.js"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

if (getCookie('devID') != undefined && getCookie('devID') != '' && window.CustomAlert != undefined) {
    window.CustomAlert(`You key is <input type="text" value="${getCookie('devID')}" disabled> Not supposed to have one ? go see <a href="https://ic-hat.geoloup.com/devkit" target="_blank">this page</a>`,'Client Dev key')

    var peer = new Peer(getCookie('devID'));
    var extensionEventPeer = []
    function extensionEvent(message) {
        console.log(message,extensionEventPeer)
        extensionEventPeer.forEach((conn)=>{
            conn.send('m' + message)
        })
    }
    window.extensionEvent = extensionEvent
    peer.on('open', () => {
      console.log('[Extension loader] API key is : ' + peer.id)
    peer.on('connection', function(conn) {
      console.log('[Extension loader] A extension has connected : ', conn)
      extensionEventPeer.push(conn)
      conn.on('data', function(data){
        console.log(data);
        if (data.startsWith('e')) {
            conn.send('e' + getCookie('email'))
        }
        if (data.startsWith('r')) {
            conn.send('r' + getCookie('lastChat'))
        }
        if (data.startsWith('n')) {
            conn.send('n' + getCookie('name'))
        }
        if (data.startsWith('m')) {
            var elements = data.split('|')
            
            var cusid = elements[1];

            var mes = window.databaseFire.ref(
            'messages/' + cusid + '/' + crypto.randomUUID()
            );
            var preload = window.databaseFire.ref('preload/' + cusid + '/Message');
            preload.set({
                email: getCookie('email'),
                allow: 'none',
                type: 'message',
                message: elements[2],
                name: getCookie('name'),
                date: Date.now(),
                dname: cusid,
            });

            mes.set({
                email: getCookie('email'),
                allow: 'none',
                type: 'message',
                message: elements[2],
                name: getCookie('name'),
                date: Date.now(),
                dname: cusid,
            });
        }
        if (data.startsWith('m')) {
            var elements = data.split('|')
            
            var cusid = elements[1];

            var mes = window.databaseFire.ref(
            'messages/' + cusid + '/' + crypto.randomUUID()
            );
            var preload = window.databaseFire.ref('preload/' + cusid + '/Message');
            preload.set({
                email: getCookie('email'),
                allow: 'none',
                type: 'embed',
                message: elements[2],
                name: getCookie('name'),
                date: Date.now(),
                dname: cusid,
            });

            mes.set({
                email: getCookie('email'),
                allow: 'none',
                type: 'embed',
                message: elements[2],
                name: getCookie('name'),
                date: Date.now(),
                dname: cusid,
            });
        }

      });
    });
    });    
}
export function load() {    
    try {
        var ext = localStorage.getItem("extention")
        var act = ext.split("gcode.custom2")
        act.forEach((main) => {
            if (main != "" && getCookie("geoloup") != null) {
                var act2 = main.split("gcode.custom3")
                var tag = document.createElement("script");
                if (act2[1].search("https://") == -1) {
                    var blob = new Blob([act2.replaceAll('"','gcode.custom1')], {type: "text/plain"});
                    act2[1]= window.URL.createObjectURL(blob);
                }
                tag.src = act2[1];
                tag.type = "module"
                document.getElementById("extention_import").appendChild(tag);
                console.log("[extention loader] " + act2[1] + " loaded")
            } else { }

        });
        var tag = document.createElement("script");
        tag.src = "core.js";
        tag.type = "module"
        document.getElementById("extention_import").appendChild(tag);
        var tag = document.createElement("script");
        tag.src = "js/call.js";
        tag.type = "module"
        document.getElementById("extention_import").appendChild(tag);
        return true
    } catch {
        return null
    }
}
