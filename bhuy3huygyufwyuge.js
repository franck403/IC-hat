import cryptoJs from "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm";

export function setCookie(cname, cvalue) {
  localStorage.setItem(cname, cvalue)
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

export function login(email, password) {
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
        setCookie("geoloup", data)
        window.location.replace("https://" + window.location.host)
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function register(name, email, password) {
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
        setCookie("geoloup", data)
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
        return fetch("https://auth.francoischouin1.repl.co/getuser?geoloup=" + getCookie("geoloup"), { mode: "no-cors" })
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

export function before(text) {
  var split = String(text).split(".")
  return split[0]
}

export function message_date(DateNow,dname) {
  document.getElementById(`time_${dname}`).dataset.send = DateNow
  var dateConvert = new Date(DateNow)
  var dateUtc = String(dateConvert).split("GMT")
  var dateUtc = dateUtc[0].split(" ")
  var dateUtc = [0]
  var dateActual = new Date(Date.now())
  if (dateConvert.getFullYear() == dateActual.getFullYear()) {
    if (dateConvert.getMonth() == dateActual.getMonth()) {
      if (dateConvert.getDate() == dateActual.getDate()) {
        if (dateConvert.getHours() == dateActual.getHours()) {
          if (dateConvert.getMinutes() == dateActual.getMinutes()) {
            var date = dateActual.getSeconds() - dateConvert.getSeconds()
            var date = before(date) + " Sec ago"
          } else {
            var date = dateActual.getMinutes() - dateConvert.getMinutes()
            var date = before(date) + " Min ago"
          }
        } else {
          var date = dateActual.getHours() - dateConvert.getHours()
          var date = before(date) + " Hours ago"
        }
      } else {
        var date = dateActual.getDate() - dateConvert.getDate()
        var date = before(date) + " Days ago"
      }
    } else {
      var date = dateActual.getMonth() - dateConvert.getMonth()
      var date = before(date) + " Months ago"
    }
  } else {
    var date = dateActual.getFullYear() - dateConvert.getFullYear()
    var date = before(date) + " Years ago"
  }
  return date
}

export function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a onclick="url(' + url + ')">' + url + '</a>';
  })
}

export function link_render(message) {
  return urlify(message)
}
export function message_render(message,type="none") {
  var messages = (function (t) {
    var r = /[^\u0300-\u036F\u0489]+/g;
    var unzalgo = function () {
      return (t.match(r) || [""]).join("");
    };
    return unzalgo()
  })(message);
  if (messages != undefined && messages != "") {
    var message_good = messages
  } else {
    var message_good = message
  }
  var message_start = message_good.substring(0,1000);
  if (type == "none") {
    return link_render(message).replaceAll("\n","<br>")
  } else{
    return message_start
  }
}


export function time_fresh() {
  try {
    var list = document.getElementsByClassName("people-person")
    Object.keys(list).forEach(id => {
      var el = list[id]
      var elt = document.getElementById("time_" + el.dataset.chatid)
      var elf = parseFloat(elt.dataset.send)
      elt.innerHTML = message_date(elf,el.dataset.chatid)
    });
  } catch(err){}
  setTimeout(time_fresh, 1000);
}


setTimeout(time_fresh, 30000);