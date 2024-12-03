import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class GetCommunityPostsUseCase {
    static GET_COMMUNITY_POSTS_URL = (communityId) => `/community/${communityId}/post`;
    static GET_COMMUNITY_POSTS_METHOD = "GET";

    async execute(params, communityId) {
        const pathWithQuery = `${GetCommunityPostsUseCase.GET_COMMUNITY_POSTS_URL(communityId)}?${params.toString()}`;

        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        try {
            return await ApiClient.sendRequest(pathWithQuery, null, headers, GetCommunityPostsUseCase.GET_COMMUNITY_POSTS_METHOD);
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }
}