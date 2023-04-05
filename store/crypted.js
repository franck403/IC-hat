const send = document.getElementById("send");
const send2 = document.getElementById("content");

send.replaceWith(send.cloneNode(true));
send2.replaceWith(send2.cloneNode(true));

send.addEventListener('click', (e) => {
    var fg = document.getElementById('content').value
    console.log(fg.replace(/\s/g, '').length)
    var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
        var str = document.getElementById('content').value;
        var str1 = str.replaceAll("<","&lt;")
        var str2 = str1.replaceAll(">","&gt;")
        var message = str2;
        var name = myName;
        const id = push(child(ref(database), 'messages')).key;
        var friend = "none"
        var cusid = document.getElementsByClassName('people-person active')[0].id
        fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/crypt/" + message, {method: "GET"})
        .then((response) => response.text())
        .then((data) => {
            set(ref(database, 'messages/'+ cusid + '/' + id), {
                email:name,
                allow:friend,
                type:"message",
                message: data,
                date: Date.now(),
                dname: cusid
            });
            document.getElementById('content').value = "";    
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } else {}
});
send2.addEventListener("keydown", (e) => {
    if (event.keyCode == 13) {
        var fg = document.getElementById('content').value
        var gh = ["a","b","c","d","e","f","g","h","i","j","k","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        if (document.getElementById('content').value != "" && fg.replace(/\s/g, '').length != 0) {
            var str = document.getElementById('content').value;
            var str1 = str.replaceAll("<","&lt;")
            var str2 = str1.replaceAll(">","&gt;")
            var message = str2;
            var name = myName;
            const id = push(child(ref(database), 'messages')).key;
            var friend = "none"
            var cusid = document.getElementsByClassName('people-person active')[0].id
            fetch("https://cryptjs-ic-hat-extention.francoischouin1.repl.co/crypt/" + message, {method: "GET"})
            .then((response) => response.text())
            .then((data) => {
                set(ref(database, 'messages/'+ cusid + '/' + id), {
                    email:name,
                    allow:friend,
                    type:"message",
                    message: data,
                    date: Date.now(),
                    dname: cusid
                });
                document.getElementById('content').value = "";    
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        } else {}
    } else {}
});
