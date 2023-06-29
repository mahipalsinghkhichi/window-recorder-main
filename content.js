chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startRecording') {
      chrome.runtime.sendMessage({ action: 'startRecording' });
    } else if (request.action === 'stopRecording') {
      chrome.runtime.sendMessage({ action: 'stopRecording' });
    }
  });
  