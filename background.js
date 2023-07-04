```javascript
let activeTabId = null;

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setPopup({ popup: 'popup.html' });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'startCapture') {
    chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      files: ['content.js']
    });
  } else if (request.message === 'stopCapture') {
    chrome.tabs.sendMessage(activeTabId, { message: 'stopCapture' });
  }
});
```