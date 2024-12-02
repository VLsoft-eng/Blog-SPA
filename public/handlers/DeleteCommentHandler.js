import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {DeleteCommentUseCase} from "/network/usecases/DeleteCommentUseCase.js";

export class DeleteCommentHandler extends AbstractHandler{
    constructor() {
        super();
        this.deleteCommentUseCase = new DeleteCommentUseCase();
    }

    async handle(commentId) {
        await this.deleteCommentUseCase.execute(commentId);
    }
}