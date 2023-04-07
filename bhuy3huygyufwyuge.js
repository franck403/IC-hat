export function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=https://auth.geoloup.com/";
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
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export function cryptmess(mess,data2) {
  fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/uncrypt?text=" + mess, {method: "GET"})
  .then((response) => response.text())
  .then((data) => {
      document.getElementById(data2.val().date).innerHTML = data
      if (data == "loading") {
      document.getElementById(data2.val().date).setAttribute("style","display:none;")
      var elem = document.querySelector(`[data-chat="${dnamef}"]`);
      elem.scrollTop = elem.scrollHeight;
      elem.scrollTop = elem.scrollHeight;
      } else {
          document.getElementById(data2.val().date).setAttribute("style","display:block;")
          var elem = document.querySelector(`[data-chat="${dnamef}"]`);
          elem.scrollTop = elem.scrollHeight;
          elem.scrollTop = elem.scrollHeight;
      }
      document.getElementById(`prew_${dnamef}`).innerHTML =  data
      var elem = document.querySelector(`[data-chat="${dnamef}"]`);
      elem.scrollTop = elem.scrollHeight;
      elem.scrollTop = elem.scrollHeight;
  })
  .catch((error) => {
      document.getElementById(data2.val().date).setAttribute("style","display:none;")
  });

}