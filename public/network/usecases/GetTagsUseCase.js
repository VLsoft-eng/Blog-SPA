import {ApiClient} from "../ApiClient.js";

export class GetTagsUseCase {
    static TAGS_URL = '/tag'
    static TAGS_METHOD = 'GET'

    async execute() {
        const headers = {};
        const body = null

        try {
            return await ApiClient.sendRequest(
                GetTagsUseCase.TAGS_URL,
                body,
                headers,
                GetTagsUseCase.TAGS_METHOD
            );
        } catch (error) {
            throw error;
        }
    }

}