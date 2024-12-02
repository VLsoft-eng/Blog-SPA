import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {SetPostAddressHandler} from "/handlers/SetPostAddressHandler.js";
import {LikeHandler} from "/handlers/LikeHandler.js";
import {PostReadMoreHandler} from "/handlers/PostReadMoreHandler.js";
import {GetPostDetailsHandler} from "/handlers/GetPostDetailsHandler.js";
import {router} from "/index.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {GetCommentChainHandler} from "/handlers/GetCommentChainHandler.js";
import {EditCommentHandler} from "/handlers/EditCommentHandler.js";
import {DeleteCommentHandler} from "/handlers/DeleteCommentHandler.js";
import {ReplyCommentHandler} from "/handlers/ReplyCommentHandler.js";
import {CreateCommentHandler} from "/handlers/CreateCommentHandler.js";

export class PostDetailsViewController {
    constructor() {
        this.setPostAddressHandler = new SetPostAddressHandler();
        this.likeHandler = new LikeHandler();
        this.postReadMoreHandler = new PostReadMoreHandler();
        this.getPostDetailsHandler = new GetPostDetailsHandler();
        this.getCommentChainHandler = new GetCommentChainHandler();
        this.editCommentHandler = new EditCommentHandler();
        this.deleteCommentHandler = new DeleteCommentHandler();
        this.replyCommentHandler = new ReplyCommentHandler();
        this.createCommentHandler = new CreateCommentHandler();
    }

    async onLoad(data) {
        await headerRenderer.renderHeader();

        try {
            const postDetails = await this.getPostDetailsHandler.handle(data.id);
            await renderContent("/resources/templates/postDetails.html");
            await this.displayPost(postDetails);
            const commentArea = document.querySelector('#comments');
            await this.displayComments(postDetails.comments, commentArea, null, postDetails.id);
            this.configureCommentInput(postDetails.id)
        } catch (error) {
            if (error.errorCode === 404) {
                await router.navigate("/none-exist");
            }
        }
    }

    async displayPost(post) {
        const postDate = new Date(post.createTime);
        const formattedDateTime = postDate.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(',', '');

        const postElement = document.querySelector('.card.d-none');
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
        postHeadingElement.href = "/" + post.id;
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

        postLikeButton.addEventListener('click', async () => {
            await this.likeHandler.handle(postElement)
        })

        postElement.classList.remove('d-none');
    }

    async displayComments(comments, commentArea, parentId, postId) {
        const updateBranch = async () => {
            let commentsCurrentDeep;
            try {
                if (parentId != null) {
                    commentsCurrentDeep = await this.getCommentChainHandler.handle(parentId);
                } else {
                    const post = await this.getPostDetailsHandler.handle(postId);
                    commentsCurrentDeep = post.comments;
                }
            } catch (error) {
                console.error("Error fetching comment chain:", error);

                const post = await this.getPostDetailsHandler.handle(postId);
                commentsCurrentDeep = post.comments;
            }

            commentArea.innerHTML = '';
            console.log(commentsCurrentDeep);
            await this.displayComments(commentsCurrentDeep, commentArea, parentId, postId);
        };

        const commentTemplate = document.querySelector('#comment-template');

        for (const comment of comments) {
            const commentElement = commentTemplate.cloneNode(true);
            const commentTextElement = commentElement.querySelector('#comment-text');
            const commentEditedLabelElement = commentElement.querySelector('#comment-edited');
            const commentAuthorElement = commentElement.querySelector('.comment-author');
            const commentTimeElement = commentElement.querySelector('.comment-time');

            commentElement.setAttribute('data-guid', comment.id)
            commentElement.removeAttribute('id');

            const replyLink = commentElement.querySelector('#reply-link');
            const replyInput = commentElement.querySelector('#reply-input');
            const editLink = commentElement.querySelector('#edit-link');
            const editInput = commentElement.querySelector('#edit-input');
            const repliesContainer = commentElement.querySelector('#replies-container');
            const repliesLink = commentElement.querySelector('#replies-link');
            const deleteLink = commentElement.querySelector('#delete-link');

            commentElement.setAttribute('data-guid', comment.id);
            repliesContainer.setAttribute('id', "replies-container-" + comment.id);
            repliesLink.setAttribute('id', "replies-link-" + comment.id);
            editInput.setAttribute('id', "edit-input-" + comment.id);
            editLink.setAttribute('id', "edit-link-" + comment.id);
            replyLink.setAttribute('id', "reply-link-" + comment.id);
            replyInput.setAttribute('id', "reply-input-" + comment.id);
            replyLink.setAttribute('data-bs-target', "#reply-input-" + comment.id);
            editLink.setAttribute('data-bs-target', "#edit-input-" + comment.id);
            repliesLink.setAttribute('data-bs-target', "#replies-container-" + comment.id);
            commentTextElement.setAttribute('id', "comment-text-" + comment.id);
            commentEditedLabelElement.setAttribute('id', 'comment-edited-' + comment.id);

            const commentTime = new Date(comment.createTime);
            commentTimeElement.textContent = commentTime.toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', '');

            console.log(commentElement)

            if (comment.subComments > 0) {
                const subCommentsContainer = commentElement.querySelector('#replies-container-' + comment.id);
                const subCommentsArea = subCommentsContainer.querySelector('.replies');

                try {
                    const replies = await this.getCommentChainHandler.handle(comment.id)
                    console.log(replies);
                    await this.displayComments(replies, subCommentsArea, comment.id, postId);

                    const repliesLink = commentElement.querySelector('#replies-link-' + comment.id);

                    repliesLink.classList.remove('d-none');
                    repliesLink.addEventListener('click', () => {
                        repliesLink.classList.add('d-none');
                    })
                } catch (error) {
                    console.log(error, "with id " + comment.id);
                }
            }

            if (!comment.content) {
                commentAuthorElement.textContent = '[Комментарий удален]';
                commentTextElement.textContent = '[Комментарий удален]';
                commentElement.classList.remove('d-none');
                commentArea.appendChild(commentElement);
                continue;
            }

            commentTextElement.textContent = comment.content;
            commentAuthorElement.textContent = comment.author;

            if (TokenUtilities.isAuthorized()) {
                replyLink.classList.remove('d-none');
                replyLink.addEventListener('click', async () => {
                    await this.replyCommentHandler.handle(commentElement, postId, updateBranch);
                })
            }

            if (TokenUtilities.isAuthorized() &&
                TokenUtilities.getCurrentUserId() === comment.authorId) {

                editLink.classList.remove('d-none');
                deleteLink.classList.remove('d-none');

                editLink.addEventListener('click', async () => {
                    await this.editCommentHandler.handle(commentElement);
                });
                deleteLink.addEventListener('click', async () => {
                    await this.deleteCommentHandler.handle(comment.id);
                    await updateBranch();
                });

            }

            if (comment.modifiedDate) {
                commentEditedLabelElement.classList.remove('d-none');
            }

            commentElement.classList.remove('d-none')
            commentArea.appendChild(commentElement)
        }
    }

    async configureCommentInput(postId) {
        const commentForm = document.querySelector('#comment-form');
        commentForm.addEventListener('submit', async (e) => {
            await this.createCommentHandler.handle(e, postId, commentForm);
            const commentArea = document.querySelector('#comments');

            const postDetails = await this.getPostDetailsHandler.handle(postId);
            await this.displayComments(postDetails.comments, commentArea, null, postDetails.id);
        })
    }
}