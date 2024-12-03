import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetAuthorsUseCase} from "/network/usecases/GetAuthorsUseCase.js";

export class GetAuthorsHandler extends AbstractHandler {
    constructor() {
        super();
        this.getAuthorsUseCase = new GetAuthorsUseCase();
    }

    handle() {
        return this.getAuthorsUseCase.execute();
    }
}