function storeCachedUrls(urls) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ 'cachedUrls': urls }, function () {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(urls);
            }
        });
    });
}

function getCachedUrls() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['cachedUrls'], function (result) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                const cachedUrls = result.cachedUrls || [];
                resolve(cachedUrls);
            }
        });
    });
}

function isValid(url, cachedUrls) {
    return !cachedUrls.some((cachedUrl) => url.includes(cachedUrl));
}

export { storeCachedUrls, getCachedUrls, isValid };