import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommunityRoleUseCase} from "/network/usecases/GetCommunityRoleUseCase.js";

export class GetCommunityRoleHandler extends AbstractHandler{
    constructor() {
        super();
        this.getCommunityRoleUseCase = new GetCommunityRoleUseCase();
    }

    async handle(communityId) {
        return await this.getCommunityRoleUseCase.execute(communityId);
    }

}