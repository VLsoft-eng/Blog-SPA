import {AbstractHandler} from "./AbstractHandler.js";
import {GetAddressChainUseCase} from "../network/usecases/GetAddressChainUseCase.js";

export class SetPostAddressHandler extends AbstractHandler{
    constructor() {
        super();
        this.getAddressChainUseCase = new GetAddressChainUseCase();
    }

    async handle(postGeoContainer, addressId) {
        if (addressId) {
            const addressChain = await this.getAddressChainUseCase.execute(addressId);
            postGeoContainer.querySelector("#post-geo").innerText =
                addressChain.map(address => `${address.text}`).join(', ') || '';
        } else {
            postGeoContainer.classList.add("d-none");
        }
    }
}