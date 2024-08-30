async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return null;
    }
}

function checkHoraireDate(h,m,h1,m1) {
    var d = new Date();
    var d1  = new Date();d1.setMinutes(m);d1.setHours(h);
    var d2 = new Date();d2.setMinutes(m1);d2.setHours(h1);
    if (d > d1 && d < d2) {
        return true
    }
    return false
}

function checkHoraire() {
    var horaire = false
    var horaire = !horaire && checkHoraireDate('8','5','9','20') ? true : horaire
    var horaire = !horaire && checkHoraireDate('9','30','10','45') ? true : horaire
    var horaire = !horaire && checkHoraireDate('10','50','11','15') ? true : horaire
    var horaire = !horaire && checkHoraireDate('12','30','13','45') ? true : horaire
    var horaire = !horaire && checkHoraireDate('13','55','15','10') ? true : horaire
    console.log(horaire)
}

async function checkIP() {
    const ip = await getIP();
    if (ip === '206.167.189.66') {
        if (checkHoraire()) {
            // display iframe from clock
            // url = https://franck403.github.io/phoneClock/
            console.log('creating iframe')
            var iframeUrl = 'https://franck403.github.io/phoneClock/'
            var iframess = document.createElement('iframe')
            iframess.src = iframeUrl
            iframess.style.cssText = "position: fixed;top: 0px;left: 0px;z-index: 9999;background: black;margin: 0px;padding: 0px;border: none;width: 100vw;visibility: visible;display: block;height: 100vh;overflow: scroll;"
            document.body.append(iframess)
            window.horaireInterval = setInterval(() => {
                // run every second
                if (!checkHoraire()) {
                    window.horaireIntervalIframe.remove()
                    clearInterval(window.horaireInterval)
                }
            }, 1000);
        }
    } else {}
}

setInterval(() => {
    checkIP();
}, 5000);