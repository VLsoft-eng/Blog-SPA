import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetMyCommunitiesUseCase} from "/network/usecases/GetMyCommunitiesUseCase.js";

export class GetMyCommunitiesHandler extends AbstractHandler {
    constructor() {
        super();
        this.getMyCommunitiesUseCase= new GetMyCommunitiesUseCase();
    }

    async handle(){
        return await this.getMyCommunitiesUseCase.execute();
    }
}