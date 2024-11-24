import {ApiClient} from "../ApiClient.js";
import {TokenUtilities} from "../../utilities/TokenUtilities.js";

export class GetProfileUseCase {
    static PROFILE_URL = "/account/profile"
    static PROFILE_METHOD = "GET"

    async execute() {

        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequest(
                GetProfileUseCase.PROFILE_URL,
                body,
                headers,
                GetProfileUseCase.PROFILE_METHOD
            );
        } catch (error) {
            throw error;
        }
    }
}
