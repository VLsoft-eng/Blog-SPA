import {ApiClient} from "../ApiClient.js";
import {TokenUtilities} from "../../utilities/TokenUtilities.js";

export class UpdateProfileUseCase {
    static UPDATE_PROFILE_URL = "/account/profile";
    static UPDATE_PROFILE_METHOD = "PUT"

    constructor() {
    }

    async execute(updateProfileRecord) {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = JSON.stringify(updateProfileRecord)

        try {
            await ApiClient.sendRequestEmptyResponse(
                UpdateProfileUseCase.UPDATE_PROFILE_URL,
                body,
                headers,
                UpdateProfileUseCase.UPDATE_PROFILE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}