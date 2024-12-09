import {GetProfileUseCase} from "../../network/usecases/GetProfileUseCase.js";
import {TokenUtilities} from "../TokenUtilities.js";

export class HeaderRenderer {
    constructor() {
        this.getProfileUseCase = new GetProfileUseCase();
        this.profileContent = document.getElementById("content-profile");
        this.routesNavigateElemenets = new Map([
            ['/login', [{ id: 'main-nav-link', href: '/', text: 'Главная' }]],
            ['/register', [{ id: 'main-nav-link', href: '/', text: 'Главная' }]],
            ['/post/create', [
                { id: 'main-nav-link', href: '/', text: 'Главная' },
                { id: 'authors-nav-link', href: '/authors', text: 'Aвторы' },
                { id: 'groups-nav-link', href: '/communities', text: 'Группы' }]
            ],
            ['/', [
                { id: 'main-nav-link', href: '/', text: 'Главная' },
                { id: 'authors-nav-link', href: '/authors', text: 'Aвторы' },
                { id: 'groups-nav-link', href: '/communities', text: 'Группы' }]
            ],
            ['/profile', [{ id: 'main-nav-link', href: '/', text: 'Главная' }, {
                id: 'post-nav-link',
                href: '/post/create',
                text: 'Создать пост'
            }]],
            ['/logout', [
                { id: 'main-nav-link', href: '/', text: 'Главная' },
                { id: 'authors-nav-link', href: '/authors', text: 'Aвторы' },
                { id: 'groups-nav-link', href: '/communities', text: 'Группы' }]
            ],
        ]);

        this.unauthorizeNavigateElemenets = ["main-nav-link"];
    }

    async fetchTemplate(url) {
        const response = await fetch(url);
        return await response.text();
    }

    async renderUnauthorizedHeader() {
        this.updateHeaderNavLinks(this.unauthorizeNavigateElemenets);
        this.profileContent.innerHTML = await this.fetchTemplate('/resources/templates/header/unauthorizedHeaderEnd.html');
    }

    async renderAuthorizedHeader() {
        try {
            const profile = await this.getProfileUseCase.execute();
            this.updateHeaderNavLinks(null);

            this.profileContent.innerHTML = await this.fetchTemplate('/resources/templates/header/authorizedHeaderEnd.html');
            const profileButton = document.getElementById("dropdownMenuButton");
            profileButton.innerText = profile.email;
        } catch (error) {
            TokenUtilities.deleteToken();
            await this.renderUnauthorizedHeader();
        }
    }

    updateHeaderNavLinks(allowedLinks) {
        const navLinkList = document.querySelectorAll("#nav-elements .nav-item");
        const currentRoute = window.location.pathname;
        const requiredNavLinks = this.routesNavigateElemenets.get(currentRoute) || this.routesNavigateElemenets.get('/');

        navLinkList.forEach(navLink => {
            const navLinkId = navLink.id;
            if (!requiredNavLinks.some(link => link.id === navLinkId)) {
                navLink.remove();
            }

            if (allowedLinks != null && !allowedLinks.includes(navLinkId)) {
                navLink.remove();
            }
        });

        requiredNavLinks.forEach(navLink => {
            const existingNavLink = document.getElementById(navLink.id);
            if (!existingNavLink) {
                if (allowedLinks != null && !allowedLinks.includes(navLink.id)) {
                    return;
                }

                const mainNavLink = document.getElementById('main-nav-link');
                if (mainNavLink) {
                    const clonedLink = mainNavLink.cloneNode(true);
                    const anchor = clonedLink.querySelector('a');
                    if (anchor) {
                        anchor.setAttribute('href', navLink.href);
                        anchor.innerText = navLink.text;
                    }
                    clonedLink.id = navLink.id;
                    navLinkList[0].parentNode.appendChild(clonedLink);
                }
            }
        });
    }

    async renderHeader() {
        if (TokenUtilities.isAuthorized()) {
            await this.renderAuthorizedHeader();
        } else {
            await this.renderUnauthorizedHeader();
        }
    }
}