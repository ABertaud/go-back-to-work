import { isValid, getCachedUrls } from './utils.js';


chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (tab.url?.startsWith("chrome://") || tab.url?.startsWith("chrome-extension://"))
        return undefined;

    if (changeInfo.status === 'complete') {
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ['animation.css']
        });
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


function doesTabExist(tabId) {
    return new Promise((resolve, reject) => {
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (tab) {
          resolve(true);
        } else {
          reject(chrome.runtime.lastError);
        }
      });
    });
}

function repeatAnimation(tabId) {
    if (!tabId) {
        return;
    }
    doesTabExist(tabId).then((tabExists) => {
        startAnimation(tabId);
        setInterval(() => {
            repeatAnimation(tabId);
        }, 60000); // 60000 ms = 1 minute
    }).catch((error) => {
        console.log("The tab has been closed.");
    });
}