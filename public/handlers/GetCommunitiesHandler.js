import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommunitiesUseCase} from "/network/usecases/GetCommunitiesUseCase.js";

export class GetCommunitiesHandler extends AbstractHandler {
    constructor() {
        super();
        this.getCommunitiesUseCase = new GetCommunitiesUseCase();
    }

    async handle() {
        return await this.getCommunitiesUseCase.execute();
    }
}