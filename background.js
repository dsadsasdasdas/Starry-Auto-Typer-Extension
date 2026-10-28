// dont be a fat chud skid
chrome.action.onClicked.addListener(async (tab) => {
  if (!Number.isInteger(tab.id)) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['active-target.js', 'typer.js', 'branding.js']
    });
    await chrome.tabs.sendMessage(tab.id, { action: 'togglePanel' });
  } catch (error) {
    console.error('Could not open Starry:', error);
  }
});
