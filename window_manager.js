// Fonction pour récupérer les données de la page Web (titre, icône) via un proxy
function fetchPageData(url) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy pour contourner CORS
    const targetUrl = encodeURIComponent(url); // Encodage de l'URL

    fetch(proxyUrl + url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Récupérer le titre de la page
            const title = doc.querySelector('title') ? doc.querySelector('title').innerText : 'No Title';

            // Récupérer l'icône de la page
            let icon = './default-icon.png'; // Icône par défaut
            const iconLink = doc.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
            if (iconLink) {
                icon = new URL(iconLink.getAttribute('href'), url).href; // Résoudre l'URL absolue de l'icône
            }

            // Créer une nouvelle fenêtre avec ces informations
            createWindow(icon, title, `<iframe src="${url}" style="width: 100%; height: 100%;"></iframe>`);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de la page:', error);
        });
}

// Fonction pour créer une fenêtre avec titre, icône et contenu
function createWindow(icon, title, content) {
    const windowId = "window" + (document.querySelectorAll('.window').length + 1);

    // Créer la structure de la fenêtre
    const windowElement = document.createElement('div');
    windowElement.classList.add('window');
    windowElement.id = windowId;

    // Créer l'en-tête de la fenêtre
    const windowHeader = document.createElement('div');
    windowHeader.classList.add('title-bar');
    windowHeader.id = windowId + 'header';

    // Créer l'icône de la fenêtre
    const windowIcon = document.createElement('img');
    windowIcon.setAttribute('aria-label', 'windowicon');
    windowIcon.src = icon;

    // Créer le titre de la fenêtre
    const windowTitle = document.createElement('div');
    windowTitle.classList.add('title-bar-text');
    windowTitle.innerText = title;

    // Créer les contrôles de la fenêtre
    const windowControls = document.createElement('div');
    windowControls.classList.add('title-bar-controls');

    const minimizeButton = document.createElement('button');
    minimizeButton.setAttribute('aria-label', 'Minimize');
    windowControls.appendChild(minimizeButton);

    const maximizeButton = document.createElement('button');
    maximizeButton.setAttribute('aria-label', 'Maximize');
    windowControls.appendChild(maximizeButton);

    const closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.addEventListener('click', () => {
        windowElement.remove(); // Supprimer la fenêtre quand on clique sur "fermer"
    });
    windowControls.appendChild(closeButton);

    // Ajouter l'icône, le titre et les contrôles dans l'en-tête
    windowHeader.appendChild(windowIcon);
    windowHeader.appendChild(windowTitle);
    windowHeader.appendChild(windowControls);

    // Créer le corps de la fenêtre
    const windowBody = document.createElement('div');
    windowBody.classList.add('window-body');
    windowBody.style.height = '245px';
    windowBody.innerHTML = content;

    // Ajouter l'en-tête et le corps de la fenêtre dans la fenêtre
    windowElement.appendChild(windowHeader);
    windowElement.appendChild(windowBody);

    // Ajouter la fenêtre à la page
    document.body.appendChild(windowElement);

    // Appliquer le drag à la nouvelle fenêtre
    dragElement(windowElement);
}

// Gestionnaire d'événements pour le bouton
document.querySelector('.open-web').addEventListener('click', () => {
    const url = prompt("Entrez l'URL de la page web à ouvrir :");
    if (url) {
        fetchPageData(url);
    }
});
