import {ApiClient} from "/network/ApiClient.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";

export class GetAuthorsUseCase {
    static GET_AUTHORS_URL = "/author/list";
    static GET_AUTHORS_METHOD = "GET";

    async execute() {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetAuthorsUseCase.GET_AUTHORS_URL,
                body,
                headers,
                GetAuthorsUseCase.GET_AUTHORS_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}