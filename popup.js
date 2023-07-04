```javascript
let activeTabId;
let userActions = [];
let instructions = [];

document.getElementById('startButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    activeTabId = tabs[0].id;
    chrome.tabs.sendMessage(activeTabId, {message: 'startCapture'});
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  chrome.tabs.sendMessage(activeTabId, {message: 'stopCapture'});
  chrome.tabs.sendMessage(activeTabId, {message: 'generateIntroJSJSON', instructions: instructions}, (response) => {
    downloadFile(response.data, 'instructions.json', 'application/json');
  });
});

document.getElementById('instructionInput').addEventListener('change', (event) => {
  let instruction = event.target.value;
  let isHighlight = document.getElementById('highlightCheckbox').checked;
  let instructionData = {instruction: instruction, isHighlight: isHighlight};
  instructions.push(instructionData);
  chrome.tabs.sendMessage(activeTabId, {message: 'storeInstruction', instructionData: instructionData});
});

function downloadFile(data, filename, type) {
  let file = new Blob([data], {type: type});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
}
```