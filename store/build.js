function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
  }
  
  function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector("#highlighting");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }
  
  function check_tab(element, event) {
    let code = element.value;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value); // Update text to include indent
    }
  }
  
var codeEditor = document.getElementById('codeEditor');
var lineCounter = document.getElementById('lineCounter');

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor.addEventListener('keydown', (e) => {
    let { keyCode } = e;
    let { value, selectionStart, selectionEnd } = codeEditor;
    if(event.shiftKey && event.keyCode == 9) { 
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart-1, selectionStart-1)
    }
    else if (keyCode == 9) {
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + ' '.repeat(4) + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart+1, selectionStart+1)
       }
 });

var lineCountCache = 0;
function line_counter() {
      var lineCount = codeEditor.value.split('\n').length;
      var outarr = new Array();
      if (lineCountCache != lineCount) {
         for (var x = 0; x < lineCount; x++) {
            outarr[x] = (x + 1) + '.';
         }
         lineCounter.value = outarr.join('\n');
      }
      lineCountCache = lineCount;
}
codeEditor.addEventListener('input', () => {
    line_counter();
});

