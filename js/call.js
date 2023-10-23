function callVideo() {
    const myRequest = new Request("https://testnode.virusgaming1.repl.co/room/");
    fetch(myRequest)
        .then((response) => {
            return response.text
        })
        .then((response) => {
            console.log(response)
            response.split("<script>").forEach(element => {
                var data = response.split("</script>")[0]
                if (data.search("ROOM_ID") != -1) {
                    window.uuid = data.split("=")[1].replaceAll('"',"").replaceAll(" ","").replaceAll(";","")
                }
            });
            var uuid = window.uuid
            url('https://testnode.virusgaming1.repl.co/room/' + uuid)
        });
};