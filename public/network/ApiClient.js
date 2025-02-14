export class ApiClient {
    static BASE_URL = "https://blog.kreosoft.space/api";

    static async sendRequest(url, body = null, headers = {}, method = "GET") {
        const fullUrl = `${ApiClient.BASE_URL}${url}`;

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: body ? body : null,
        };

        const response = await fetch(fullUrl, options);

        if (response.ok) {
            return await response.json();
        } else {
            const contentLength = response.headers.get('Content-Length');
            const errorBody = contentLength && parseInt(contentLength) > 0
                ? await response.json()
                : "Unknown error occurred.";

            throw { errorCode: response.status, errorBody: errorBody };
        }
    }

    static async sendRequestEmptyResponse(url, body = null, headers = {}, method = "GET") {
        const fullUrl = `${ApiClient.BASE_URL}${url}`;

        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: body ? body : null,
        }

        const response = await fetch(fullUrl, options);
        if (!response.ok) {
            const errorBody = await response.json();
            throw {errorCode: response.status, errorBody: errorBody};
        }
    }
}