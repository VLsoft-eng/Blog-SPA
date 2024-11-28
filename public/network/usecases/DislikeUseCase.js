import {TokenUtilities} from "../../utilities/TokenUtilities.js";
import {ApiClient} from "../ApiClient.js";

export class DislikeUseCase {
    static DISLIKE_URL = (postId) => `/post/${postId}/like`
    static DISLIKE_METHOD = "DELETE"

    async execute(postId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequestEmptyResponse(
                DislikeUseCase.DISLIKE_URL(postId),
                body,
                headers,
                DislikeUseCase.DISLIKE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}