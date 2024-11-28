import {GetPostsUseCase} from "../network/usecases/GetPostsUseCase.js";
import {AbstractHandler} from "./AbstractHandler.js";

export class GetPostsHandler extends AbstractHandler{
    constructor() {
        super();
        this.getPostsUseCase = new GetPostsUseCase();
    }

    async handle (params) {
        try{
            return await this.getPostsUseCase.execute(params);
        } catch (error) {
            console.error(error);
        }
    }
}