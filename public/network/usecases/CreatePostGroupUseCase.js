import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.JS";

export class CreatePostGroupUseCase {
    static CREATE_GROUP_POST_URL =  (communityId) =>`/community/${communityId}/post`;
    static CREATE_GROUP_POST_METHOD = "POST";

    async handle(communityId,createPostRequest) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = JSON.stringify(createPostRequest);

        try {
            return await ApiClient.sendRequest(
                CreatePostGroupUseCase.CREATE_GROUP_POST_URL(communityId),
                body,
                headers,
                CreatePostGroupUseCase.CREATE_GROUP_POST_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}