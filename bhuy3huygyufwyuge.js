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
  console.log(text)
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

export function link_render(message) {
  if (type == "none") {
    var message1 = message.split(" ")
    var message2 = message1.join(".")
    var message2 = message1.split(".")
    var message3 = message1.split(".")
    message2.forEach((element) => {
      if (element.search("http://") != -1) {
        message3.push(`<a href="${element}"> ${element} </a>`)
      } else if (element.search("https://") != -1) {
        message3.push(`<a href="${element}"> ${element} </a>`)
      } else {
        message.push(element)

      }
    });
  } else {
    return message    
  }
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
  return message_start
  if (type  == "none") {
      link_render(message)
  }
}


export function time_fresh() {
  try {
    console.log("[time] Refreshing time")
    var list = document.getElementsByClassName("people-person")
    Object.keys(list).forEach(id => {
      var el = list[id]
      var elt = document.getElementById("time_" + el.dataset.chatid)
      var elf = parseFloat(elt.dataset.send)
      elt.innerHTML = message_date(elf,el.dataset.chatid)
    });
    console.log("[time] time refreshed")
  } catch(err){
    console.log("[time] time refreshed with the error :" + err.message)
  }
  setTimeout(time_fresh, 1000);
}


setTimeout(time_fresh, 30000);