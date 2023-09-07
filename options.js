document.addEventListener('DOMContentLoaded', function () {
    const urlForm = document.getElementById('url-form');
    const urlInput = document.getElementById('url');
    const urlList = document.getElementById('url-list');

    urlForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const url = urlInput.value.trim();
        if (url !== '') {
            // Stocker l'URL dans le cache ou dans une autre structure de données
            // Exemple : localStorage.setItem('urls', JSON.stringify([...urls, url]));
            const listItem = document.createElement('li');
            listItem.textContent = url;
            urlList.appendChild(listItem);
            urlInput.value = '';
        }
    });
});
