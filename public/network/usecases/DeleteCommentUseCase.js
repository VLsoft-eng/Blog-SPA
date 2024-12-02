import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class DeleteCommentUseCase {
    static DELETE_COMMENT_METHOD = 'DELETE';
    static DELETE_COMMENT_URL = (commentId) => `/comment/${commentId}`;

    async execute(commentId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            await ApiClient.sendRequestEmptyResponse(
                DeleteCommentUseCase.DELETE_COMMENT_URL(commentId),
                body,
                headers,
                DeleteCommentUseCase.DELETE_COMMENT_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}