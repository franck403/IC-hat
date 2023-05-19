import cryptoJs from "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm";

export function setCookie(cname, cvalue) {
  localStorage.setItem(cname,cvalue)
}

export function getCookie(cname) {
  if (localStorage.getItem(cname) != undefined) {
    return localStorage.getItem(cname)
  }
  return null;
}
export function Regex(text) {
  let regex = /\?/;
  return regex.test(text)
}

export function delCookie(name) { 
  localStorage.removeItem(name)
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
  var audio = new Audio('message_recive.mp3');
  audio.play();
}

export function login(email,password) {
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password)
  fetch("https://auth.francoischouin1.repl.co/login", {
    method: "POST",
    body: formData
  })
  .then((response) => response.text())
  .then((data) => {
    if (data != "no") {
      setCookie("geoloup",data)
      window.location.replace("https://" + window.location.host)
    }
  })
  .catch((error) => {
      console.error("Error:", error);
  });
}

export function register(name,email,password) {
  let formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  fetch("https://auth.francoischouin1.repl.co/register", {
    method: "POST",
    body: formData
  })
  .then((response) => response.text())
  .then((data) => {
    if (data != "no") {
      setCookie("geoloup",data)
      window.location.replace("https://" + window.location.host)
    }
  })
  .catch((error) => {
      console.error("Error:", error);
  });
}

export function getuser() {
  if (getCookie("geoloup") != null) {
    return fetch("https://auth.francoischouin1.repl.co/getuser?geoloup=" + getCookie("geoloup"))
    .then((reponse) => reponse.text())
    .then((data) => {
      if (data != "no") {
        return data
      }
      return null
    })
    .catch(() => {
      return fetch("https://auth.francoischouin1.repl.co/getuser?geoloup=" + getCookie("geoloup"),{mode:"no-cors"})
      .then((reponse) => reponse.text())
      .then((data) => {
        if (data != "no") {
          return data
        }
        return null
      })
      .catch(() => {
        return null
      })
    })
  } else {
    return null
  }
}