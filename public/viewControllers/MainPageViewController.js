import {renderContent} from "../utilities/render/contentRenderUtilities.js";
import {GetPostsHandler} from "../handlers/GetPostsHandler.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";
import {LikeHandler} from "../handlers/LikeHandler.js";
import {GetTagsHandler} from "../handlers/GetTagsHandler.js";
import {FilterSubmitHandler} from "../handlers/FilterSubmitHandler.js";
import {Pagination} from "../utilities/Pagination.js";
import {SetPostAddressHandler} from "../handlers/SetPostAddressHandler.js";
import {PostReadMoreHandler} from "../handlers/PostReadMoreHandler.js";

export class MainPageViewController {
    constructor() {
        this.getPostsHandler = new GetPostsHandler();
        this.likeHandler = new LikeHandler();
        this.getTagsHandler = new GetTagsHandler();
        this.filterSubmitHandler = new FilterSubmitHandler();
        this.setPostAddressHandler = new SetPostAddressHandler();
        this.postReadMoreHandler = new PostReadMoreHandler();
        this.pagination = new Pagination();
    }

    async onLoad(params) {
        await headerRenderer.renderHeader();
        await renderContent('/resources/templates/feed.html');
        const feed = await this.getPostsHandler.handle(params);
        this.configureAuthorizeUi();
        await this.configureFiltersUi(params)

        const paginationContainer = document.querySelector('.pagination')
        const itemsPerPageSelector = document.getElementById('posts-per-page-select');
        this.pagination.updateOptions(paginationContainer, itemsPerPageSelector, {
            totalPages: feed.pagination.count,
            itemsPerPage: feed.pagination.size,
            currentPage: feed.pagination.current,
            onParametersChange: () => this.onViewParametersChange(),
        });

        this.pagination.updatePagination();
        this.pagination.updateItemsPerPageSelect();
        await this.displayPosts(feed.posts);
    }

    async configureFiltersUi(params) {
        const tags = await this.getTagsHandler.handle();
        this.updateFilterTags(tags);

        const authorSearchInput = document.getElementById("author-search");
        const author = params.get("author");
        if (author) {
            authorSearchInput.value = author;
        }

        const tagSelect = document.getElementById("tag-search-select");
        const pickedTags = params.getAll("tags");
        if (pickedTags) {
            tagSelect.querySelectorAll('option').forEach(option => option.selected = false);
            pickedTags.forEach(tag => {
                let option = Array.from(tagSelect.options).find(option => option.value === tag);
                if (option) {
                    option.selected = true;
                }
            });
        }

        const readingTimeFromInput = document.getElementById("reading-time-from-input");
        const min = params.get("min")
        if (min) {
            readingTimeFromInput.value = min;
        }

        const readingTimeToInput = document.getElementById("reading-time-to-input");
        const max = params.get("max")
        if (max) {
            readingTimeToInput.value = max;
        }

        const sortBySelect = document.getElementById("sort-by-select");
        const sorting = params.get("sorting");
        if (sorting) {
            sortBySelect.value = sorting;
        }

        const onlyMineCheckbox = document.getElementById("only-mine-check");
        const onlyMyCommunities = params.get("onlyMyCommunities");
        if (onlyMyCommunities !== null) {
            onlyMineCheckbox.checked = onlyMyCommunities === "true";
        }

        const filterForm = document.getElementById("filter-form");
        filterForm.addEventListener("submit", async e => {
            e.preventDefault();
            await this.onViewParametersChange()
        })
    }

    configureAuthorizeUi() {
        if (TokenUtilities.isAuthorized()) {
            const writePostButton = document.getElementById('write-post-feed-button');
            const onlyMineCheckboxContainer = document.getElementById('only-mine-check-container');

            writePostButton.classList.remove('d-none');
            onlyMineCheckboxContainer.classList.remove('d-none');
        }
    }

    async onViewParametersChange() {
        const filterForm = document.getElementById("filter-form");

        const paginationParams = {};
        paginationParams.page = this.pagination.currentPage;
        paginationParams.size = this.pagination.itemsPerPage;

        await this.filterSubmitHandler.handle(filterForm, paginationParams);
    }

    async displayPosts(posts) {
        const feedContainer = document.getElementById('feed-posts');
        const postTemplate = feedContainer.querySelector('.card.d-none');
        feedContainer.innerHTML = '';

        for (const post of posts) {
            const postDate = new Date(post.createTime);
            const formattedDateTime = postDate.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', '');

            const postElement = postTemplate.cloneNode(true);
            const hashtagsElement = postElement.querySelector('#post-hashtags');
            const hashtags = post.tags.map(tag => `#${tag.name}`).join(', ') || '';
            const community = post.communityName ? `#${post.communityName}` : '';
            const postImage = postElement.querySelector('#post-image');

            postElement.querySelector('#post-information').textContent = `${post.author} - ${formattedDateTime}`;
            await this.setPostAddressHandler.handle(postElement.querySelector('#post-geo-container'), post.addressId);
            postElement.querySelector('#post-heading').textContent = post.title || '';
            hashtagsElement.textContent = `${hashtags}${hashtags && community ? ', ' : ''}${community}`;
            postElement.querySelector('#post-reading-time').textContent = `Время чтения: ${post.readingTime} мин.`;
            postElement.querySelector('#like-count').textContent = post.likes || 0;
            postElement.querySelector('#comment-count').textContent = post.commentsCount || 0;
            postElement.setAttribute('data-guid', post.id);
            postElement.setAttribute('data-isLiked', post.hasLike)
            this.postReadMoreHandler.handle(postElement, post.description)

            if (post.image) {
                postImage.classList.remove('d-none');
                postImage.src = post.image;
                postImage.alt = 'Изображение поста';
            }

            if (post.hasLike) {
                postElement.querySelector('#like-btn').classList.remove('bi-heart');
                postElement.querySelector('#like-btn').classList.add('text-danger');
                postElement.querySelector('#like-btn').classList.add('bi-heart-fill');
                postElement.querySelector('#like-count').classList.add('text-danger');
            }

            postElement.querySelector('#like-btn').addEventListener('click', async () => {
                await this.likeHandler.handle(postElement)
            })

            feedContainer.appendChild(postElement);
            postElement.classList.remove('d-none');
        }
    }

    updateFilterTags(tags) {
        const tagSelect = document.getElementById("tag-search-select");
        const optionTemplate = tagSelect.querySelector('.d-none');
        tagSelect.innerText = '';
        tags.forEach(tag => {
            const option = optionTemplate.cloneNode(true);
            option.innerText = tag.name;
            option.setAttribute('value', tag.id);
            option.classList.remove('d-none');
            tagSelect.appendChild(option);
        });
    }
}