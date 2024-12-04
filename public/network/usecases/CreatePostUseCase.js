import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {ApiClient} from "/network/ApiClient.js";

export class CreatePostUseCase {
    static CREATE_POST_URL = "/post";
    static CREATE_POST_METHOD = "POST";

    async execute(createPostRequest) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        console.log(createPostRequest);
        const body = JSON.stringify(createPostRequest);
        console.log(body)

        try {
            return await ApiClient.sendRequest(
                CreatePostUseCase.CREATE_POST_URL,
                body,
                headers,
                CreatePostUseCase.CREATE_POST_METHOD
            );
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}