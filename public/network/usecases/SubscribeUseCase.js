import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class SubscribeUseCase {
    static SUBSCRIBE_URL = (communityId) => `/community/${communityId}/subscribe`;
    static SUBSCRIBE_METHOD = "POST";

    async execute(communityId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequestEmptyResponse(
                SubscribeUseCase.SUBSCRIBE_URL(communityId),
                body,
                headers,
                SubscribeUseCase.SUBSCRIBE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}