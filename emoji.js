function addEmoji(emoji) {
    let inputEle = document.getElementById('content');
    input.value += emoji;
  }
  
  function toggleEmojiDrawer() {
    let drawer = document.getElementById('drawer');  
    if (drawer.classList.contains('hidden')) {
      drawer.classList.remove('hidden')
    } else {
      drawer.classList.add('hidden')
    }
  }
  
  function toggle_class(categorie) {
    var otog = document.getElementById(categorie)
    var htog = document.getElementById("emoji-" + categorie + "-toggle")
    var otogg = document.getElementsByClassName("emoji-drawer-class-active")[0]
    var htogg = document.getElementsByClassName("emoji-active-toggle")[0]
    try {
      otogg.setAttribute("class","emoji-drawer-class")
      htogg.setAttribute("class","emoji-normal-toggle")
    } catch {}
    otog.setAttribute("class","emoji-drawer-class-active")
    htog.setAttribute("class","emoji-active-toggle")
  }
toggleEmojiDrawer()
