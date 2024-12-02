import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class GetCommunityRoleUseCase {
    static GET_COMMUNITY_ROLE_URL = (communityId) => `/community/${communityId}/role`;
    static GET_COMMUNITY_ROLE_METHOD = "GET";

    async execute(communityId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetCommunityRoleUseCase.GET_COMMUNITY_ROLE_URL(communityId),
                body,
                headers,
                GetCommunityRoleUseCase.GET_COMMUNITY_ROLE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}