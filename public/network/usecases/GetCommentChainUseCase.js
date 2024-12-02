import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class GetCommentChainUseCase {
    static COMMENT_CHAIN_URL = (commentId) => `/comment/${commentId}/tree`
    static COMMENT_CHAIN_METHOD = "GET"

    async execute(commentId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetCommentChainUseCase.COMMENT_CHAIN_URL(commentId),
                body,
                headers,
                GetCommentChainUseCase.COMMENT_CHAIN_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}