import {AbstractHandler} from "./AbstractHandler.js";
import {GetTagsUseCase} from "../network/usecases/GetTagsUseCase.js";

export class GetTagsHandler extends AbstractHandler{
    constructor() {
        super();
        this.getTagsUseCase = new GetTagsUseCase();
    }

    async handle () {
        try {
            return await this.getTagsUseCase.execute();
        } catch (error) {

        }
    }
}