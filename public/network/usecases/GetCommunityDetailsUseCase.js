import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class GetCommunityDetailsUseCase {
    static GET_COMMUNITY_DETAILS_URL = (communityId) => `/community/${communityId}`;
    static GET_COMMUNITY_DETAILS_METHOD = "GET"
    async execute(communityId) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        try {
            return await ApiClient.sendRequest(
                GetCommunityDetailsUseCase.GET_COMMUNITY_DETAILS_URL(communityId),
                null, headers,
                GetCommunityDetailsUseCase.GET_COMMUNITY_DETAILS_METHOD);
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }
}