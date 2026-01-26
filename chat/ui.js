// popup

function UIpopup(html, actions, callback) {
  var pop = document.createElement('div');
  var popContent = document.createElement('div');
  var popButtons = document.createElement('div');
  pop.classList.add('popup');
  popContent.classList.add('popupContent');
  popButtons.classList.add('popupButtons');
  popContent.innerHTML = html;
  actions.forEach((action) => {
    var popButton = document.createElement('button');
    popButton.textContent = action;
    popButton.onclick = callback;
    popButton.classList.add('popupButton');
    popButtons.appendChild(popButton);
  });
  pop.appendChild(popContent);
  pop.appendChild(popButtons);
}
