import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {GetAuthorsHandler} from "/handlers/GetAuthorsHandler.js";
import {router} from "/index.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class AuthorsViewController {
    constructor() {
        this.getAuthorsHandler = new GetAuthorsHandler();
    }

    async handle() {
        if (!TokenUtilities.isAuthorized()) {
            await router.navigate("/notAuthorized");
        }
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/authors.html");
        const authors = await this.getAuthorsHandler.handle();
        this.displayAuthors(authors);

    }

    displayAuthors(authors) {
        const authorsList = document.getElementById("authors-list");
        const authorMaleTemplate = authorsList.querySelector(".male-profile");
        const authorFemaleTemplate = authorsList.querySelector(".female-profile");

        const sortedAuthors = [...authors].sort((a, b) => (b.likes + b.posts) - (a.likes + a.posts));
        const authorRanking = authors.map((author, index) => ({
            id: index,
            rank: sortedAuthors.findIndex(sortedAuthor => sortedAuthor === author) + 1,
        }));

        for (let i = 0; i < authors.length; i++) {
            const author = authors[i];

            const authorCreated = new Date(author.created);
            const formattedAuthorCreated = authorCreated.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).replace(',', '');

            const authorBirthday = new Date(author.birthDate);
            console.log(authorBirthday)
            const formattedAuthorBirthdate = authorBirthday.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).replace(',', '');

            let authorElement;

            if (author.gender === "Male") {
                authorElement = authorMaleTemplate.cloneNode(true);
            } else {
                authorElement = authorFemaleTemplate.cloneNode(true);
            }

            const authorNameElement = authorElement.querySelector(".user-name");
            const authorCreateTimeElement = authorElement.querySelector(".user-create-time");
            const authorBirthdayElement = authorElement.querySelector(".user-birthday");
            const likesCountElement = authorElement.querySelector(".likes-count");
            const postsCountElement = authorElement.querySelector(".posts-count");
            const crownElement = authorElement.querySelector(".fa-crown");

            authorNameElement.textContent = author.fullName;
            authorNameElement.href = "/?author=" + author.fullName;
            authorCreateTimeElement.textContent = "Создан: " + formattedAuthorCreated;
            authorBirthdayElement.textContent = "Дата рождения: " + formattedAuthorBirthdate;
            likesCountElement.textContent = "Лайков: " + author.likes;
            postsCountElement.textContent = "Постов: " + author.posts;

            const authorRank = authorRanking.find(ranking => ranking.id === i)?.rank;

            if (authorRank === 1) {
                crownElement.classList.remove("d-none");
                crownElement.classList.add("text-warning");
            } else if (authorRank === 2) {
                crownElement.classList.remove("d-none");
                crownElement.classList.add("text-secondary");
            } else if (authorRank === 3) {
                crownElement.classList.remove("d-none");
                crownElement.classList.add("text-info");
            }
            authorElement.classList.remove("d-none")
            authorsList.appendChild(authorElement);
        }
    }
}