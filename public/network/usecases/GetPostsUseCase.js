import {ApiClient} from "../ApiClient.js";
import {TokenUtilities} from "../../utilities/TokenUtilities.js";

export class GetPostsUseCase {
    static GET_POSTS_URL = "/post"
    static GET_POSTS_METHOD = "GET"

    async execute(params) {
        const pathWithQuery = `${GetPostsUseCase.GET_POSTS_URL}?${params.toString()}`;
        console.log(pathWithQuery, "pwh");

        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        try {
            return await ApiClient.sendRequest(pathWithQuery, null, headers, GetPostsUseCase.GET_POSTS_METHOD);
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }
}