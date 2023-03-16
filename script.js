function send() {
    var message = document.getElementById("content")
    html = `<div class="bubble me">${ message.value }</div>`
    const id = push(child(ref(database), 'messages')).key;

    set(ref(database, 'messages/' + id), {
        name: name,
        message: message
    });
    document.getElementById('content').value = "";

}


const newMsg = ref(database, 'messages/');
onChildAdded(newMsg, (data) => {
    if(data.val().name != myName) {
        mes = data.val().message
        html = `<div class="bubble you">${ mes }</div>`
        const d1 = document.querySelector('[data-chat="person1"]');
        d1.insertAdjacentHTML('chat', html);
    }else{
        mes = data.val().message
        html = `<div class="bubble me">${ mes }</div>`
        var d1 = document.getElementById('bodyContent');
        d1.insertAdjacentHTML('chat', html);
    }
});