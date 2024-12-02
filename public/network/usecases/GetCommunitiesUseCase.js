import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class GetCommunitiesUseCase {
    static GET_COMMUNITIES_URL = "/community";
    static GET_COMMUNITIES_METHOD = "GET";

    async execute() {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetCommunitiesUseCase.GET_COMMUNITIES_URL,
                body,
                headers,
                GetCommunitiesUseCase.GET_COMMUNITIES_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}