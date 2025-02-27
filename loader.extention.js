import { getCookie, getuser } from "./functions.js"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

var peer = new Peer(getCookie('devID'));
peer.on('open', () => {
  console.log('[Extension loader] API key is : ' + peer.id)
peer.on('connection', function(conn) {
  console.log('[Extension loader] A extension has connected : ', conn)
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
  });
});
});
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
