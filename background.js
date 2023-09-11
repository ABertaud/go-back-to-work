
import { isValid, getCachedUrls } from './utils.js';

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        const url = tab.url;
        var cachedUrls = await getCachedUrls();
        const valid = isValid(url, cachedUrls);

        if (!valid) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: showAlert
            });
        }
    }
});

function showAlert() {
    alert('You should not spend that much time on this page!');
}