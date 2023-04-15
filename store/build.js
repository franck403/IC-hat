var codeEditor = document.getElementById('codeEditor');
var lineCounter = document.getElementById('lineCounter');

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor.addEventListener('keydown', (e) => {
    let { keyCode } = e;
    let { value, selectionStart, selectionEnd } = codeEditor;
    if (keyCode === 9) {
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '    ' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart+1, selectionStart+1)
       }
    else if(event.shiftKey && event.keyCode == 9) { 
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart-1, selectionStart-1)
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