
import { isValid, getCachedUrls } from './utils.js';

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab);
    if (changeInfo.status === 'complete') {
        const url = tab.url;

        console.log("OVER HERE");
        var cachedUrls = await getCachedUrls();
        console.log(cachedUrls);
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