import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {EditCommentUseCase} from "/network/usecases/EditCommentUseCase.js";

export class EditCommentHandler extends AbstractHandler {
    constructor() {
        super();
        this.editCommentUseCase = new EditCommentUseCase();
    }

    async handle(commentElement) {
        const commentId = commentElement.getAttribute('data-guid');
        const commentTextElement = commentElement.querySelector("#comment-text-" + commentId);
        const editInputContainer = commentElement.querySelector('#edit-input-' + commentId);
        const editInput = editInputContainer.querySelector('.form-control');
        const editSubmitButton = editInputContainer.querySelector('.btn');

        editInput.value = commentTextElement.textContent;
        editSubmitButton.addEventListener('click', async () => {
            try {
                await this.editCommentUseCase.execute(commentId, editInput.value);

                editInputContainer.classList.remove('show');
                commentTextElement.textContent = editInput.value

                const commentEditedLabel = commentElement.querySelector("#comment-edited-" + commentId);
                commentEditedLabel.classList.remove('d-none');
            } catch (error) {
                console.log("editing error");
            }
        })
    }
}