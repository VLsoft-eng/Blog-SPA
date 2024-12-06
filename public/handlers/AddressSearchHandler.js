import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetAddressSearchUseCase} from "/network/usecases/AddressSearchUseCase.js";

export class AddressSearchHandler extends AbstractHandler{
    constructor() {
        super();
        this.addressSearchUseCase = new GetAddressSearchUseCase();
    }

    async handle (params) {
        try{
            const urlParams = new URLSearchParams();
            if (params.query !== undefined && params.query !== "") {
                urlParams.append("query", params.query);
            }

            if (params.parentObjectId !== undefined && params.parentObjectId !== null) {
                urlParams.append("parentObjectId", params.parentObjectId);
            }
            const data = await this.addressSearchUseCase.execute(urlParams);
            return data.map(item => ({
                id: item.objectId,
                text: item.text,
                objectGuid: item.objectGuid,
                objectLevel: item.objectLevel,
                objectLevelText: item.objectLevelText,
            }));
        } catch (error) {
            console.error(error);
        }
    }
}