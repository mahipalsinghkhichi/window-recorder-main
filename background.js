chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({ text: 'REC' });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.executeScript(tab.id, { file: 'content.js' });
  });
  