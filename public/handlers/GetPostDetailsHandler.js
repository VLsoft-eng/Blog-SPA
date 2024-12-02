import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetPostDetailsUseCase} from "/network/usecases/GetPostDetailsUseCase.js";

export class GetPostDetailsHandler extends AbstractHandler {
    constructor() {
        super();
        this.getPostDetailsUseCase = new GetPostDetailsUseCase();
    }

    async handle(postId) {
        try {
            return await this.getPostDetailsUseCase.execute(postId);
        } catch (error) {
            throw error;
        }
    }
}