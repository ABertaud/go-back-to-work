
import { isValid, getCachedUrls } from './utils.js';


chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ['animation.css']
    });

    if (changeInfo.status === 'complete') {
        const url = tab.url;
        var cachedUrls = await getCachedUrls();
        const valid = isValid(url, cachedUrls);

        if (!valid) {
            repeatAnimation(tabId);
        }
    }
});


function startAnimation(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: () => {
            const body = document.querySelector('body');
            body.classList.add('start-animation');
            body.addEventListener('animationend', function () {
                body.classList.remove('start-animation');
            });
        }
    });
}

function repeatAnimation(tabId) {
    startAnimation(tabId);
    setInterval(() => {
        repeatAnimation(tabId);
    }, 60000); // 60000 ms = 1 minute
}