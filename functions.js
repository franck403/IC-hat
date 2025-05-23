import cryptoJs from "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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
  document.getElementById("wait-connected").remove()
  if (localStorage.getItem("state" != "disable")) {
    localStorage.setItem("state", "yes")
  }
}

export function encrypt(text) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(text));
};

export function decrypt(data) {
  return cryptoJs.enc.Base64.parse(data).toString(cryptoJs.enc.Utf8);
};

export function state() {
  if (localStorage.getItem("state") == 'yes') {
    localStorage.setItem("state", "no")
  } else {
    localStorage.setItem("state", "yes")
  }
}

export function bip() {
  if (localStorage.getItem("state") == 'yes') {
    var audio = new Audio('message_recive.mp3');
    audio.play();
  } else {
    console.log("notification disable by user")
  }
}

export async function getuser() {
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

export function message_date(DateNow, dname) {
  try {
    document.getElementById(`time_${dname}`).dataset.send = DateNow
    var dateConvert = new Date(DateNow)
    var dateUtc = String(dateConvert).split("GMT")
    var dateUtc = dateUtc[0].split(" ")
    var dateUtc = [0]
    var dateActual = new Date(Date.now())
    var dateActualy = addYears(dateActual, 1)
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
  } catch {
    return null
  }
}

export function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return `<a class="link" onclick="Openurl('${url}')">${url}</a>`;
  })
}

export function link_render(message) {
  return urlify(message)
}
export function textMessage(message) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://vector.profanity.dev', false); // 'false' makes the request synchronous
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ message }));
  var status = JSON.parse(xhr.response)
  if (xhr.status >= 200 && xhr.status < 300) {
    if (status.isProfanity) {
      console.log(status)
      var regex = new RegExp(status.flaggedFor, "gi");
      return message.replace(regex, match => '*'.repeat(match.length));
    }
    return message;
  } else {
    return "error message"
  }
}

export async function ASYNCtextMessage(message) {
  try {
    const response = await fetch('https://vector.profanity.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      return "error message";
    }

    const status = await response.json();

    if (status.isProfanity) {
      console.log(status);
      const regex = new RegExp(status.flaggedFor, "gi");
      return message.replace(regex, match => '*'.repeat(match.length));
    }

    return message;
  } catch (error) {
    console.error('Fetch error:', error);
    return "error message";
  }
}

// js/markdownConverter.js
export function convertMarkdownToHTML(markdownText) {
  let htmlContent = markdownText;
  htmlContent = htmlContent.replace(/^# (.*)/gm, '<h2>$1</h2>');
  htmlContent = htmlContent.replace(/^## (.*)/gm, '<h3>$1</h3>');
  htmlContent = htmlContent.replace(/^### (.*)/gm, '<h4>$1</h4>');
  htmlContent = htmlContent.replace(/^#### (.*)/gm, '<h5>$1</h5>');
  htmlContent = htmlContent.replace(/^- (.*)$/gm, '<ul><li>$1</li></ul>');
  htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  htmlContent = htmlContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
  htmlContent = htmlContent.replaceAll('\n','<br>');
  return htmlContent;
}

export function embed_render(message) {
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
  var message_start = message_good.substring(0, 1000);
  var message_start = message_start.replaceAll('<','&lt;')
  var message_start = message_start.replaceAll('>','&gt;')
  var message_start = convertMarkdownToHTML(message_start)
  if (message_start == "undefined" || message_start == undefined) {
    return null; 
  }
  return message_start
}

export function message_render(message, type = "none") {
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
  var message_start = message_good.substring(0, 1000);
  var message_start = message_start.replaceAll('<','&lt;')
  var message_start = message_start.replaceAll('>','&gt;')
  if (type == "nop") {
    var message_start = textMessage(message_start)
  }
  if (message_start == "undefined" || message_start == undefined) {
    return null; 
  }
    return message_start
}

export async function ASYNCmessage_render(message, type = "none") {
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
  var message_start = message_good.substring(0, 1000);
  var message_start = message_start.replaceAll('<','&lt;')
  var message_start = message_start.replaceAll('>','&gt;')
  if (type == "nop") {
    var message_start = await ASYNCtextMessage(message_start)
  }
  if (message_start == "undefined" || message_start == undefined) {
    return null; 
  }
  return message_start
}

export function markdown_render(message) {
  if (message.slice(0,1) == '#') {
    return marked.parse(message)
  }
  return message
}

export function loadScript(file) {
  var tag = document.createElement("script");
  tag.src = file;
  document.getElementById("import").appendChild(tag);
}


export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
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

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
