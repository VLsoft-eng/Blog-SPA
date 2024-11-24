import {ApiClient} from "../ApiClient.js";

export class RegisterUseCase {
    static REGISTER_URL = "/account/register"
    static REGISTER_METHOD = "POST"

    async execute(registerRecord) {
        const headers = {}
        const body = JSON.stringify(registerRecord)

        try {
            const response = await ApiClient.sendRequest(
                RegisterUseCase.REGISTER_URL,
                body,
                headers,
                RegisterUseCase.REGISTER_METHOD
            );
            console.log(response);
            return response.token;
        } catch (error) {
            throw error;
        }
    }
}