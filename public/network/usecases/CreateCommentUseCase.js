import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class CreateCommentUseCase {
    static CREATE_COMMENT_URL = (postId) => `/post/${postId}/comment`;
    static CREATE_COMMENT_METHOD = "POST";

    async execute(postId, content) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = {
            content: content,
        }

        try {
            await ApiClient.sendRequestEmptyResponse(
                CreateCommentUseCase.CREATE_COMMENT_URL(postId),
                JSON.stringify(body),
                headers,
                CreateCommentUseCase.CREATE_COMMENT_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}