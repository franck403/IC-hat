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
  if (localStorage.getItem("state" != "disable")) {
    localStorage.setItem("state","yes")
  }
}

export function encrypt(text) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
};

export function decrypt(data) {
  return cryptoJs.enc.Base64.parse(data).toString(cryptoJs.enc.Utf8);
};

export function state() {
  localStorage.setItem("state","yes")
}

export function bip() {
  if (localStorage.getItem("state") == "yes") {
    var audio = new Audio('message_recive.mp3');
    audio.play();
    localStorage.setItem("state","no")
  }
  if (localStorage.getItem("state" != "disable")) {
    setTimeout(state,1000)
  }
}

export function getuser() {
  const user = netlifyIdentity.currentUser();
  return user
}

export function before(text) {
  var split = String(text).split(".")
  return split[0]
}
/*
mes time = 1sec
act time = 1min

if mes have more than 365j 6h then
  get number of years
else then
  if mes have more than 30.46666666666667mon then
    get number of month
  else then
    if mess have more than 1d then
      get number of day
    else then
      if mes have more than 1h then
        get number of hours
      else then 
        if mes have more thant 1m then
          get number of minutes
        else then
          if mess have more than 1s then
            get number of seconds
          else
            get number of seconds
*/

/*export var CDate = {
  "m": 1000 * 60,
  "h": this.m * 60,
  "d": this.h * 24,
  "y": this.d * 365,
  "mt": this.d * 0.03287671232876712,
  "ss":"",
  "define":(m) => {
    this.ss = m
    return this.ss
  },
  "day":() => {
    return Math.round(this.ss / this.d)
  },
  "years":() => {
    return Math.round(this.ss / this.y)
  },
  "minutes":() => {
    return Math.round(this.ss / this.m)
  },
  "hours":() => {
    return Math.round(this.ss / this.h)
  },
  "months":() => {
    return Math.round(this.ss / this.mt)
  },
  "":() => {},
  "":() => {},
  "":() => {},
  "":() => {},
}
*/
export function addYears(date, years) {
  const dateCopy = new Date(date);
  dateCopy.setFullYear(dateCopy.getFullYear() + years);
  return dateCopy;
}

export function message_date(DateNow,dname) {
  document.getElementById(`time_${dname}`).dataset.send = DateNow
  var dateConvert = new Date(DateNow)
  var dateUtc = String(dateConvert).split("GMT")
  var dateUtc = dateUtc[0].split(" ")
  var dateUtc = [0]
  var dateActual = new Date(Date.now())
  var dateActualy = addYears(dateActual,1)
  if (dateConvert.getFullYear() == dateActual.getFullYear()) {
    if (dateConvert.getMonth() == dateActual.getMonth()) {
      if (dateConvert.getDate() == dateActual.getDate()) {
        if (dateConvert.getHours() == dateActual.getHours()) {
          if (dateConvert.getMinutes() == dateActual.getMinutes()) {
            var date = dateActualy.getSeconds() - dateConvert.getSeconds()
            var date = before(date) + " Sec ago"
          } else {
            var date = dateActualy.getMinutes() - dateConvert.getMinutes()
            var date = before(date) + " Min ago"
          }
        } else {
          var date = dateActualy.getHours() - dateConvert.getHours()
          var date = before(date) + " Hours ago"
        }
      } else {
        var date = dateActualy.getDate() - dateConvert.getDate()
        var date = before(date) + " Days ago"
      }
    } else {
      var date = dateActualy.getMonth() - dateConvert.getMonth()
      var date = before(date) + " Months ago"
    }
  } else {
    var date = dateActualy.getFullYear() - dateConvert.getFullYear()
    var date = before(date) + " Years ago"
  }
  return date
}

export function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return `<a class="link" onclick="url('${url}')">${url}</a>`;
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
    return link_render(message_start).replaceAll("\n","<br>")
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
  } catch {}
  setTimeout(time_fresh, 1000);
}

setTimeout(time_fresh, 30000);

export function changepic(img,email) {
  let formData = new FormData();
  formData.append('email', email);
  formData.append('image', img);
  fetch("https://auth-pic.virusgaming1.repl.co/changepic", {
    method: "POST",
    body: formData
  })
    .then((response) => response.text())
    .then((data) => {
      if (data != "no") {
        window.location.replace("https://" + window.location.host)
      } else {
        alert("user was not find or a error occurrent. Please try again in 10min")
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


export function loadScript(file) {
  var tag = document.createElement("script");
  tag.src = file;
  document.getElementById("import").appendChild(tag);
}


export const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}