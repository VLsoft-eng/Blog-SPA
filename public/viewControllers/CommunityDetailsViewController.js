import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {Pagination} from "/utilities/Pagination.js";
import {GetCommunityDetailsHandler} from "/handlers/GetCommunityDetailsHandler.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {CommunityActionHandler} from "/handlers/CommunityActionHandler.js";
import {GetCommunityPostsHandler} from "/handlers/GetCommunityPostsHandler.js";
import {GetTagsHandler} from "/handlers/GetTagsHandler.js";
import {FilterSubmitHandler} from "/handlers/FilterSubmitHandler.js";
import {PostReadMoreHandler} from "/handlers/PostReadMoreHandler.js";
import {SetPostAddressHandler} from "/handlers/SetPostAddressHandler.js";
import {LikeHandler} from "/handlers/LikeHandler.js";
import {GetCommunityRoleHandler} from "/handlers/GetCommunityRoleHandler.js";

export class CommunityDetailsViewController {
    constructor() {
        this.pagination = new Pagination();
        this.getCommunityDetailsHandler = new GetCommunityDetailsHandler();
        this.communityActionHandler = new CommunityActionHandler();
        this.getCommunityPostsHandler = new GetCommunityPostsHandler();
        this.getTagsHandler = new GetTagsHandler();
        this.filterSubmitHandler = new FilterSubmitHandler();
        this.postReadMoreHandler = new PostReadMoreHandler();
        this.setPostAddressHandler = new SetPostAddressHandler();
        this.likeHandler = new LikeHandler();
        this.getCommunityRoleHandler = new GetCommunityRoleHandler();
    }

    async handle(data, params) {
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/communityDetails.html");

        try {
            const communityDetails = await this.getCommunityDetailsHandler.handle(data.id);
            const paginationContainer = document.querySelector('.pagination')
            const itemsPerPageSelector = document.getElementById('posts-per-page-select');
            await this.configureFiltersUi(params);
            await this.displayCommunity(communityDetails);
            this.communityId = communityDetails.id;
            const postsInfo = await this.getCommunityPostsHandler.handle(params, data.id);

            this.pagination.updateOptions(paginationContainer, itemsPerPageSelector, {
                totalPages: postsInfo.pagination.count,
                itemsPerPage: postsInfo.pagination.size,
                currentPage: postsInfo.pagination.current,
                onParametersChange: () => this.onViewParametersChange(),
            });

            this.pagination.updatePagination();
            this.pagination.updateItemsPerPageSelect();
            await this.displayPosts(postsInfo.posts);

        } catch (error) {
            if (error.errorCode === 404) {
                await renderContent("/resources/templates/notFound.html");
            }

            if (error.errorCode === 403) {
                const paginationOptions = document.getElementById('pagination-options');
                paginationOptions.classList.add('d-none');
            }
        }
    }

    async displayCommunity(communityDetails) {
        const communityElement = document.querySelector("#group-card");
        const administratorsListElement = communityElement.querySelector("#community-admins-list");
        const femaleAdminTemplate = administratorsListElement.querySelector(".female-profile");
        const maleAdminTemplate = administratorsListElement.querySelector(".male-profile");
        const subscribersCountElement = communityElement.querySelector("#community-subscribers-count");
        const communityTypeElement = communityElement.querySelector("#community-type");
        const communityNameElement = communityElement.querySelector("#community-name");
        const communityNameFormat = (name) => `Группа "${name}"`;

        communityElement.setAttribute("data-guid", communityDetails.id);

        const adminsList = communityDetails.administrators;
        for (const admin of adminsList) {
            if (admin.gender === "Male") {
                const maleUserElement = maleAdminTemplate.cloneNode(true);
                const userNameElement = maleUserElement.querySelector(".user-name");
                userNameElement.textContent = admin.fullName;
                maleUserElement.classList.remove("d-none");
                administratorsListElement.appendChild(maleUserElement);
            } else {
                const femaleUserElement = femaleAdminTemplate.cloneNode(true);
                const userNameElement = femaleUserElement.querySelector(".user-name");
                userNameElement.textContent = admin.name;
                femaleUserElement.classList.remove("d-none");
                administratorsListElement.appendChild(femaleUserElement);
            }
        }

        subscribersCountElement.textContent = communityDetails.subscribersCount + " подписчиков"

        if (communityDetails.isClosed === true) {
            communityTypeElement.textContent = "Тип сообщества: закрытое";
        } else {
            communityTypeElement.textContent = "Тип сообщества: открытое";
        }

        communityNameElement.textContent = communityNameFormat(communityDetails.name);

        if (!TokenUtilities.isAuthorized()) {
            return;
        }

        const communityUserRole = await this.getCommunityRoleHandler.handle(communityDetails.id)
        if (communityUserRole === "Administrator") {
            const communityWritePostButton = communityElement.querySelector(".write-post-btn");
            communityWritePostButton.classList.remove("d-none");
        }

        await this.communityActionHandler.handle(communityElement);
        communityElement.classList.remove('d-none');
    }

    async configureFiltersUi(params) {
        const tags = await this.getTagsHandler.handle();
        this.updateFilterTags(tags);

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

        const sortBySelect = document.getElementById("sort-by-select");
        const sorting = params.get("sorting");
        if (sorting) {
            sortBySelect.value = sorting;
        }

        const filterForm = document.getElementById("filter-form");
        filterForm.addEventListener("submit", async e => {
            e.preventDefault();
            await this.onViewParametersChange()
        })
    }

    async onViewParametersChange() {
        const filterForm = document.getElementById("filter-form");

        const paginationParams = {};
        paginationParams.page = this.pagination.currentPage;
        paginationParams.size = this.pagination.itemsPerPage;

        await this.filterSubmitHandler.handle(filterForm, paginationParams, "/community/" + this.communityId,);
    }

    async displayPosts(posts) {
        const feedContainer = document.getElementById('feed-posts');
        const postTemplate = feedContainer.querySelector('.card');

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
            const postHeadingElement = postElement.querySelector('#post-heading');
            const postInformationElement = postElement.querySelector('#post-information');
            const postReadingTimeElement = postElement.querySelector('#post-reading-time');
            const postLikeCountElement = postElement.querySelector('#like-count');
            const postCommentCountElement = postElement.querySelector('#comment-count');
            const postGeoContainer = postElement.querySelector('#post-geo-container');
            const postImage = postElement.querySelector('#post-image');
            const postLikeButton = postElement.querySelector('#like-btn');
            const hashtags = post.tags.map(tag => `#${tag.name}`).join(', ') || '';
            const community = post.communityName ? `#${post.communityName}` : '';


            postInformationElement.textContent = `${post.author} - ${formattedDateTime}`;
            postHeadingElement.textContent = post.title || '';
            postHeadingElement.href = "/post/" + post.id;
            hashtagsElement.textContent = `${hashtags}${hashtags && community ? ', ' : ''}${community}`;
            postReadingTimeElement.textContent = `Время чтения: ${post.readingTime} мин.`;
            postLikeCountElement.textContent = post.likes || 0;
            postCommentCountElement.textContent = post.commentsCount || 0;

            postElement.setAttribute('data-guid', post.id);
            postElement.setAttribute('data-isLiked', post.hasLike)

            this.postReadMoreHandler.handle(postElement, post.description)
            await this.setPostAddressHandler.handle(postGeoContainer, post.addressId);


            if (post.image) {
                postImage.classList.remove('d-none');
                postImage.src = post.image;
                postImage.alt = 'Изображение поста';
            }

            if (post.hasLike) {
                postLikeButton.classList.remove('bi-heart');
                postLikeButton.classList.add('text-danger');
                postLikeButton.classList.add('bi-heart-fill');
                postLikeCountElement.classList.add('text-danger');
            }


            postElement.querySelector('#like-btn').addEventListener('click', async () => {
                await this.likeHandler.handle(postElement)
            })

            postElement.classList.remove('d-none');
            feedContainer.appendChild(postElement);
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