import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class ReplyCommentUseCase {
    static REPLY_URL = (postId) => `/post/${postId}/comment`;
    static REPLY_METHOD = "POST";

    async execute(content, parentId, postId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = {
            content: content,
            parentId: parentId
        }

        try {
            await ApiClient.sendRequestEmptyResponse(
                ReplyCommentUseCase.REPLY_URL(postId),
                JSON.stringify(body),
                headers,
                ReplyCommentUseCase.REPLY_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}