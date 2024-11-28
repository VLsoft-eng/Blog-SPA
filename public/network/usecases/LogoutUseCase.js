import {ApiClient} from "../ApiClient.js";
import {TokenUtilities} from "../../utilities/TokenUtilities.js";

export class LogoutUseCase {
    static LOGOUT_URL = "/account/logout"
    static LOGOUT_METHOD = "POST"

    async execute() {
        const tokenValue = TokenUtilities.getToken()
        const headers = {};
        if (tokenValue) {
            headers['Authorization'] = `Bearer ${tokenValue}`;
        }

        const body = null

        try {
            return await ApiClient.sendRequestEmptyResponse(
                LogoutUseCase.LOGOUT_URL,
                body,
                headers,
                LogoutUseCase.LOGOUT_METHOD
            )
        } catch (error) {
            throw error;
        }
    }
}