import { getCachedUrls, isValid } from './utils.js';

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    document.getElementById('url-display').textContent = url;

    var cachedUrls = await getCachedUrls();

    const valid = isValid(url, cachedUrls);
    if (valid) {
        document.querySelector('.round-status').classList.remove('round-invalid');
        document.querySelector('.round-status').classList.add('round-valid');

    } else {
        document.querySelector('.round-status').classList.remove('round-valid');
        document.querySelector('.round-status').classList.add('round-invalid');
    }
});