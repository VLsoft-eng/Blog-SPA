import {ApiClient} from "../ApiClient.js";

export class GetAddressChainUseCase {
    static ADDRESS_CHAIN_URL = "/address/chain";
    static ADDRESS_CHAIN_METHOD = "GET";
    async execute(parentId) {
        const pathWithQuery = `${GetAddressChainUseCase.ADDRESS_CHAIN_URL}?objectGuid=${parentId}`;

        try {
            return await ApiClient.sendRequest(pathWithQuery, null, {}, GetAddressChainUseCase.ADDRESS_CHAIN_METHOD);
        } catch (error) {
            throw error;
        }

    }
}