```javascript
let userActions = [];
let instructions = [];
let activeElement = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'startCapture':
      startCapture();
      break;
    case 'stopCapture':
      stopCapture();
      break;
    case 'storeInstruction':
      storeInstruction(request.data);
      break;
  }
});

function startCapture() {
  document.body.addEventListener('mouseover', highlightElement);
  document.body.addEventListener('click', generateSelector);
}

function stopCapture() {
  document.body.removeEventListener('mouseover', highlightElement);
  document.body.removeEventListener('click', generateSelector);
  generateIntroJSJSON();
  downloadFile();
}

function highlightElement(event) {
  if (activeElement) {
    activeElement.style.outline = '';
  }
  activeElement = event.target;
  activeElement.style.outline = '2px solid rgba(0, 0, 255, 0.5)';
}

function generateSelector(event) {
  event.preventDefault();
  event.stopPropagation();
  let path = [];
  let el = event.target;
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += '#' + el.id;
    } else {
      let sib = el, nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() == selector)
          nth++;
      }
      if (nth != 1)
        selector += ":nth-of-type("+nth+")";
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  userActions.push(path.join(" > "));
}

function storeInstruction(data) {
  instructions.push(data);
}

function generateIntroJSJSON() {
  let introJSSteps = instructions.map((instruction, index) => {
    return {
      element: userActions[index],
      intro: instruction.text,
      position: instruction.isHighlight ? 'floating' : 'auto'
    };
  });
  return JSON.stringify(introJSSteps);
}

function downloadFile() {
  let a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([generateIntroJSJSON()], {type: 'application/json'}));
  a.download = 'instructions.json';
  a.click();
}
```