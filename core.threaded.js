function returnVal(message,id) {
    self.postMessage([message,id])
}

onmessage = (event) => {
    console.log(event.data)
    if (event.data == "called") {
        // prework before html to prevent freeze
        {
            const dnamef = data2.val().dname
            var class_added = `tooltip`
            var tooltip = `
                <span class="tooltiptext">Send at ${String(new Date(data2.val().date))}</span>
            `
            const d1 = document.querySelector(`[data-chat="${dnamef}"]`);
            if (data2.val().name != null) {
                if (data2.val().message != null) {
                    if (data2.val().type == "message") {
                        if (data2.val().name != null) {
                            if (data2.val().email == myEmail) {
                                var html = `<div class="bubble me ${class_added}">${message_render(data2.val().message)} ${tooltip}</div>`
                                var DateNow = data2.val().date
                                var date = message_date(DateNow, dnamef)
                                
                            } else {
                                var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div>${tooltip}</div>`
                                var DateNow = data2.val().date
                                var date = message_date(DateNow, dnamef)
                                
                            }
                            var elem = d1
                            elem.scrollTop = elem.scrollHeight;
                            elem.scrollTop = elem.scrollHeight;
                        } else { }
                    } else if (data2.val().type == "image") {
                        if (data2.val().email == myEmail) {
                            var html = `<div class="bubble me ${class_added}"><img class="type-img" src="${data2.val().message}"></img>${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            
                        } else {
                            var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img class="type-img" src="${data2.val().message}"></img></div>${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            
                        }
                        var elem = d1
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else if (data2.val().type == "new-image") {
                        if (data2.val().email == myEmail) {
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            var html = `<div class="bubble me ${class_added}"><img onclick="big(this.src)" class="type-img img-load-${dnamef}" data-state="unload" data-date="${DateNow}" data-src="${data2.val().message}"></img>${tooltip}</div>`
                            
                        } else {
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div><img onclick="big(this.src)" class="type-img img-load-${dnamef}" data-date="${DateNow}" data-state="unload" data-src="${data2.val().message}"></img></div>${tooltip}</div>`
                            
                        }
                        var elem = d1
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else if (data2.val().type == "new-encrypted") {
                        if (data2.val().email == myEmail) {
                            var message = decrypt(data2.val().message)
                            var html = `<div class="bubble me ${class_added}" id="${data2.val().date}">${message_render(message)}${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            
                        } else {
                            var message = decrypt(data2.val().message)
                            var html = `<div class="bubble you ${class_added}"><div class="bubble-name">${data2.val().name}</div><div>${message_render(message)}</div>${tooltip}</div>`
                            var DateNow = data2.val().date
                            var date = message_date(DateNow, dnamef)
                            
                        }
                        var elem = d1
                        elem.scrollTop = elem.scrollHeight;
                        elem.scrollTop = elem.scrollHeight;
                    } else if (data2.val().type == null) {
                        if (data2.val().name != null) {
                            if (data2.val().name == myName) {
                                var html = `<div class="bubble me">${message_render(data2.val().message)}</div>`
                                var DateNow = data2.val().date
                                var date = message_date(DateNow, dnamef)
                                
                            } else {
                                var html = `<div class="bubble you"><div class="bubble-name">${data2.val().name}</div><div>${message_render(data2.val().message)}</div></div>`
                                var DateNow = data2.val().date
                                var date = message_date(DateNow, dnamef)
                                
                            }
                            var elem = d1
                            elem.scrollTop = elem.scrollHeight;
                            elem.scrollTop = elem.scrollHeight;
                        } else { }
                    } else if (data2.val().type == "messages") {
    
                    } else if (data2.val().type == "message") {
                    } else if (data2.val().type == "encrypted") {
                    } else {
                        OnNewMessage.OnMessage(data2.val())
                    }
                    bip()
                }
                else { }
            };
    
        }
        returnVal(d1,1)
    }
}
