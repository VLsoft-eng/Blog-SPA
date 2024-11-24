import {ApiClient} from "../ApiClient.js";

export class LoginUseCase {
    static LOGIN_URL = "/account/login"
    static LOGIN_METHOD = "POST"

    async execute(loginRecord) {
        const headers = {};
        const body = JSON.stringify({
            email: loginRecord.email,
            password: loginRecord.password,
        });
        console.log(body)

        try {
            const response = await ApiClient.sendRequest(
                LoginUseCase.LOGIN_URL,
                body,
                headers,
                LoginUseCase.LOGIN_METHOD
            );
            return response.token;
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}