function resize(){
    var actual_size = window.innerWidth
    var max_size = 971
    if (actual_size < max_size) {    
        var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class","write")
        var old2 = document.getElementsByClassName("chat active-chat")[0].setAttribute("class","chat")
        var old3 = document.getElementsByClassName("top")[1].setAttribute("class","top")
        var old3 = document.getElementsByClassName("mobile")[0].setAttribute("class","mobile-hidden")
    } else {
        var old1 = document.getElementsByClassName("write write-active")[0].setAttribute("class","write")
        var old2 = document.getElementsByClassName("chat active-chat")[0].setAttribute("class","chat")
        var old3 = document.getElementsByClassName("top")[1].setAttribute("class","top")    
        var old3 = document.getElementsByClassName("mobile")[0].setAttribute("class","mobile-hidden")
    }
}