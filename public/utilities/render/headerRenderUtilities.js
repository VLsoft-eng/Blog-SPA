function renderUnauthorizedHeader() {
    const navContent = document.getElementById("content-nav");
    const profileContent = document.getElementById("content-profile");

    navContent.innerHTML = '';
    profileContent.innerHTML = '';

    Promise.all([
        fetch('resources/templates/header/unauthorizedNavbar.html').then(response => response.text()),
        fetch('resources/templates/header/unauthorizedHeaderEnd.html').then(response => response.text())
    ])
        .then(([navbarHtml, headerEndHtml]) => {
            navContent.innerHTML = navbarHtml;
            profileContent.innerHTML = headerEndHtml;
            console.log("navbarHtml", navbarHtml);
        })
        .catch(error => {
            console.error('Ошибка при загрузке шаблонов:', error);
        });
}

function renderAuthorizedHeader() {
    const navContent = document.getElementById("content-nav");
    const profileContent = document.getElementById("content-profile");

    navContent.innerHTML = '';
    profileContent.innerHTML = '';

    Promise.all([
        fetch('resources/templates/authorizedNavbar.html').then(response => response.text()),
        fetch('resources/templates/authorizedHeaderEnd.html').then(response => response.text())
    ])
        .then(([navbarHtml, headerEndHtml]) => {
            navContent.innerHTML = navbarHtml;
            profileContent.innerHTML = headerEndHtml;
        })
        .catch(error => {
            console.error('Ошибка при загрузке шаблонов:', error);
        });
}

export function renderHeader() {
    if (isAuthorized()) {
        renderAuthorizedHeader();
    } else {
        renderUnauthorizedHeader();
    }
    console.log("penis")
}

function isAuthorized() {
    return !!localStorage.getItem("token");
}

export function renderStaticContent(contentPath) {
    const contentContainer = document.getElementById("content");
    content.innerHTML = '';

    fetch(contentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
        })
        .catch(error => {
            console.error('Ошибка при загрузке статического контента:', error);
        });
}