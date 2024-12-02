import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class UnsubscribeUseCase {
    static UNSUBSCRIBE_URL = (communityId) => `/community/${communityId}/unsubscribe`;
    static UNSUBSCRIBE_METHOD = "DELETE";

    async execute(communityId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequestEmptyResponse(
                UnsubscribeUseCase.UNSUBSCRIBE_URL(communityId),
                body,
                headers,
                UnsubscribeUseCase.UNSUBSCRIBE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}