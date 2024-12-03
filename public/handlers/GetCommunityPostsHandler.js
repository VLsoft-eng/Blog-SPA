import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommunityPostsUseCase} from "/network/usecases/GetCommunityPostsUseCase.js";

export class GetCommunityPostsHandler extends AbstractHandler{
    constructor() {
        super();
        this.getCommunityPostsUseCase = new GetCommunityPostsUseCase();
    }

    async handle (params, communityId) {
        try{
            return await this.getCommunityPostsUseCase.execute(params, communityId);
        } catch (error) {
            throw error;
        }
    }
}