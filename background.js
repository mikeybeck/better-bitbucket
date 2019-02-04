
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript(tab.ib, {
		file: 'inject.js'
	});
	chrome.tabs.insertCSS(tab.ib, {
		file: 'inject.css'
	});
});