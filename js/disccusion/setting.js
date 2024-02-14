// setting minify code
class MyCustomElement extends HTMLElement { constructor() {super(); } connectedCallback() { var div = `<style>.context-menu{background-color:#fff;color:#1f194c;max-width:200px;z-index:10;padding:4px;font-size:20px;display:flex;flex-wrap:wrap;position:fixed;border-radius:5px;border:solid #00000030 1px;visibility:hidden}.context-menu span{color:black;padding:10px;width:100%}.context-menu span i{margin-right:20px;color:black;}.context-menu span i:hover{background-color:rgba(44,141,247,.2);color:black}.item{color:black}.context-menu span:hover{color:black;background-color:rgba(44,141,247,.2);cursor:pointer}</style><i class="fa-solid fa-ellipsis"style="rotate: 90deg;"onclick='!function(i){var e=i.parentNode.querySelector("div");"visible"==e.style.visibility?e.style.visibility="hidden":e.style.visibility="visible"}(this)'></i><div class=context-menu><span class=item><i class="fa-solid fa-user-plus"></i>Create invite</span><span class=item onclick='hidediscusion'><i class="fa-solid fa-user-minus"></i>Hide for you</span><span class=item><i class="fa-solid fa-pen-to-square"></i>Edit name</span></div>`; this.innerHTML = div } } customElements.define("popup-setting-menu", MyCustomElement);
// to create <popup-setting-menu></popup-setting-menu>
// make popumenu disapera after click
function allclose() {
    var elements = document.getElementsByClassName('context-menu')
    for (let index = 0; index < elements.length; index++) {
        var element = elements[index];
        element.style.visibility = "hidden"
    }
}
window.onclick = allclose
// to do create all the button function

function hidediscusion() {
    window.hidediscusionintern(localStorage.getItem(lastChat))
}