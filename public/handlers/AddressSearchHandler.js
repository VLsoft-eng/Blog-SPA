import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetAddressSearchUseCase} from "/network/usecases/AddressSearchUseCase.js";

export class AddressSearchHandler extends AbstractHandler{
    constructor() {
        super();
        this.addressSearchUseCase = new GetAddressSearchUseCase();
    }

    async handle (params) {
        try{
            return await this.addressSearchUseCase.execute(params);
        } catch (error) {
            console.error(error);
        }
    }
}