import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommunityDetailsUseCase} from "/network/usecases/GetCommunityDetailsUseCase.js";

export class GetCommunityDetailsHandler extends AbstractHandler{
    constructor() {
        super();
        this.getCommunityDetailsUseCase = new GetCommunityDetailsUseCase();

    }

    async handle(communityId) {
        try {
            return await this.getCommunityDetailsUseCase.execute(communityId);
        } catch (error) {
            throw error;
        }
    }
}