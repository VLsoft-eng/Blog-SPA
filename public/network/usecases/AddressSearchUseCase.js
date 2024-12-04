import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class GetAddressSearchUseCase {
    static ADDRESS_SEARCH_URL = "/address/search";
    static ADDRESS_SEARCH_METHOD = "GET"

    async execute(params) {
        const pathWithQuery = `${GetAddressSearchUseCase.ADDRESS_SEARCH_URL}?${params.toString()}`;
        console.log(pathWithQuery, "pwh");

        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        try {
            return await ApiClient.sendRequest(pathWithQuery, null, headers, GetAddressSearchUseCase.ADDRESS_SEARCH_METHOD);
        } catch (error) {
            throw error;
        }
    }
}