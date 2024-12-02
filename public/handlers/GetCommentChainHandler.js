import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommentChainUseCase} from "/network/usecases/GetCommentChainUseCase.js";

export class GetCommentChainHandler extends AbstractHandler {
    constructor() {
        super();
        this.getCommentChainUseCase = new GetCommentChainUseCase();
    }

    async handle(commentId) {
        try {
            return await this.getCommentChainUseCase.execute(commentId);
        } catch (error) {
            throw error;
        }
    }
}