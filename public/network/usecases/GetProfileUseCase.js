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
            const profileInfo = await ApiClient.sendRequest(
                GetProfileUseCase.PROFILE_URL,
                body,
                headers,
                GetProfileUseCase.PROFILE_METHOD
            );
            TokenUtilities.setCurrentUserId(profileInfo.id);

            return profileInfo;
        } catch (error) {
            throw error;
        }
    }
}
