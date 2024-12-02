import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class GetPostDetailsUseCase {
    static POST_DETAILS_URL = (postId) => `/post/${postId}`
    static POST_DETAILS_METHOD = "GET"

    async execute(postId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetPostDetailsUseCase.POST_DETAILS_URL(postId),
                body,
                headers,
                GetPostDetailsUseCase.POST_DETAILS_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}