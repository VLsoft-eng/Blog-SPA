import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {ReplyCommentUseCase} from "/network/usecases/ReplyCommentUseCase.js";

export class ReplyCommentHandler extends AbstractHandler  {
    constructor() {
        super();
        this.replyCommentUseCase = new ReplyCommentUseCase();
    }

    async handle(commentElement, postId, callback) {
        const commentId = commentElement.getAttribute('data-guid');
        const replyInputContainer = commentElement.querySelector('#reply-input-' + commentId);
        const replyInput = replyInputContainer.querySelector('.form-control');
        const replyButton = replyInputContainer.querySelector('.btn');

        replyButton.addEventListener('click', async () => {
            const replyContent = replyInput.value;
            try {
                await this.replyCommentUseCase.execute(replyContent, commentId, postId);
                await callback();
            } catch (error) {
                console.error(error);
            }
        })

    }
}