import cryptoJs from "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm";

export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}
export function Regex(text) {
  let regex = /\?/;
  return regex.test(text)
}

export function delCookie(name) { 
  console.log('[Cookie del] a cookie was delete')  
  document.cookie = name+'=;  expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

export function removeloader() {
  document.getElementById("loader").remove();
  document.getElementById("loader_box").remove()
}

export function encrypt(text) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
};

export function decrypt(data) {
  return cryptoJs.enc.Base64.parse(data).toString(cryptoJs.enc.Utf8);
};

export function bip() {
  var audio_element = document.getElementById("message_recive")
  audio_element.play()
}