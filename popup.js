chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
    var url = currentTab.url;
    document.getElementById('url-display').textContent = url;

    var cachedUrls = JSON.parse(localStorage.getItem('urls')) || [];

    const valid = !cachedUrls.some((cachedUrl) => url.includes(cachedUrl));
    if (valid) {
        document.querySelector('.status p').textContent = 'Status: Valid';
        document.querySelector('.status p').classList.remove('invalid');
        document.querySelector('.round-status').classList.remove('round-invalid');
        document.querySelector('.status p').classList.add('valid');
        document.querySelector('.round-status').classList.add('round-valid');

    } else {
        document.querySelector('.status p').textContent = 'Status: Invalid';
        document.querySelector('.status p').classList.remove('valid');
        document.querySelector('.round-status').classList.remove('round-valid');
        document.querySelector('.status p').classList.add('invalid');
        document.querySelector('.round-status').classList.add('round-invalid');
    }
});
