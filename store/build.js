var codeEditor = document.getElementById('codeEditor');
var lineCounter = document.getElementById('lineCounter');
var codeEditor = document.getElementById('codeEditor2');
var lineCounter = document.getElementById('lineCounter2');

codeEditor.addEventListener('scroll', () => {
    lineCounter.scrollTop = codeEditor.scrollTop;
    lineCounter.scrollLeft = codeEditor.scrollLeft;
});
codeEditor.addEventListener('keydown', (e) => {
       let { keyCode } = e;
       let { value, selectionStart, selectionEnd } = codeEditor;
if (keyCode === 9) {  // TAB = 9
         e.preventDefault();
         codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
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
var lineCountCache2 = 0;
function line_counter2() {
      var lineCount2 = codeEditor2.value.split('\n').length;
      var outarr = new Array();
      if (lineCountCache2 != lineCount2) {
         for (var x = 0; x < lineCount2; x++) {
            outarr[x] = (x + 1) + '.';
         }
         lineCounter2.value = outarr.join('\n');
      }
      lineCountCache2 = lineCount2;
}
codeEditor2.addEventListener('input', () => {
    line_counter();
});