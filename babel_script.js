document.querySelector('.chat[data-chat=person1]').classList.add('active-chat')
document.querySelector('.person[data-d-chat=person1]').classList.add('active')

let friends = {
    list: document.querySelector('ul.people'),
    all: document.querySelectorAll('.left .person'),
    name: ''
  },
  chat = {
    container: document.querySelector('.container .right'),
    current: null,
    person: null,
    name: document.querySelector('.container .right .top .name')
  }

friends.all.forEach(f => {
  f.addEventListener('mousedown', () => {
    f.classList.contains('active') || setAciveChat(f)
  })
});

function setAciveChat(f) {
  friends.list.querySelector('.active').classList.remove('active')
  f.classList.add('active')
  chat.current = chat.container.querySelector('.active-chat')
  chat.person = f.getAttribute('data-d-chat')
  chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat')
  friends.name = f.querySelector('.name').innerText
  f.querySelector('.name').innerText = name
  chat.name.innerHTML = friends.name
  chat.current.classList.remove('active-chat')
}