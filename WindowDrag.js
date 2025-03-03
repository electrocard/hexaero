// Ajoute un écouteur d'événement de glissement pour chaque fenêtre
document.querySelectorAll('.window').forEach(window => {
  dragElement(window);  // Applique la fonction dragElement à chaque fenêtre
});

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var isDragging = false;
  var windowHeader = document.getElementById(elmnt.id + "header") || elmnt;

  windowHeader.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    var hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
    if (hoveredElement.tagName.toLowerCase() === 'button') {
      hoveredElement.focus();
      return;
    }
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    if (!isDragging) {
      isDragging = true; // Commence à déplacer quand la souris bouge
    }
    if (isDragging) {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    isDragging = false;
  }
}

// Ajoute un écouteur d'événement de clic à chaque fenêtre
document.querySelectorAll('.window').forEach(window => {
  window.addEventListener('click', () => {
    bringWindowToFront(window);
  });
});

// Fonction pour mettre la fenêtre au premier plan
function bringWindowToFront(window) {
  // Récupère toutes les fenêtres
  const allWindows = document.querySelectorAll('.window');

  // Remet toutes les fenêtres à leur état de fond
  allWindows.forEach(w => {
    w.style.zIndex = 1;
  });

  // Met la fenêtre cliquée au premier plan
  window.style.zIndex = 10;  // Un z-index plus grand met cette fenêtre au premier plan
}
