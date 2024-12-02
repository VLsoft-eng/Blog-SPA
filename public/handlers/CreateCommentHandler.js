import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {CreateCommentUseCase} from "/network/usecases/CreateCommentUseCase.js";

export class CreateCommentHandler extends AbstractHandler {
    constructor() {
        super();
        this.createCommentUseCase = new CreateCommentUseCase();
    }

    async handle(e, postId, commentForm) {
        e.preventDefault();
        const commentInput = commentForm.querySelector("#comment-input");
        const content = commentInput.value;

        try {
            await this.createCommentUseCase.execute(postId, content);
            commentInput.value = "";
        } catch (error) {
            console.error(error);
        }

    }
}