import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class GetMyCommunitiesUseCase {
    static GET_MY_COMMUNITIES_URL = "/community/my";
    static GET_MY_COMMUNITIES_METHOD = "GET";

    async execute() {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetMyCommunitiesUseCase.GET_MY_COMMUNITIES_URL,
                body,
                headers,
                GetMyCommunitiesUseCase.GET_MY_COMMUNITIES_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}