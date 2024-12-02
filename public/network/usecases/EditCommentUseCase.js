import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class EditCommentUseCase {
    static EDIT_COMMENT_URL = (commentId) => `/comment/${commentId}`;
    static EDIT_COMMENT_METHOD = 'PUT';

    async execute(commentId, value) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = {
            content: value
        }

        try {
            await ApiClient.sendRequestEmptyResponse(
                EditCommentUseCase.EDIT_COMMENT_URL(commentId),
                JSON.stringify(body),
                headers,
                EditCommentUseCase.EDIT_COMMENT_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}