import {TokenUtilities} from "../../utilities/TokenUtilities.js";
import {ApiClient} from "../ApiClient.js";

export class LikeUseCase {
    static LIKE_URL = (postId) => `/post/${postId}/like`
    static LIKE_METHOD = "POST"

    async execute(postId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequestEmptyResponse(
                LikeUseCase.LIKE_URL(postId),
                body,
                headers,
                LikeUseCase.LIKE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}