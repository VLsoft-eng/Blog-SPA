import {AbstractHandler} from "./AbstractHandler.js";
import {router} from "../index.js";

export class FilterSubmitHandler extends AbstractHandler {
    async handle(form, pagination) {
        const formData = new FormData(form);
        const params = {};

        formData.forEach((value, key) => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input && input.type === "checkbox") {
                params[key] = input.checked;
            } else {
                if (value) {
                    params[key] = value;
                }
            }
        });

        if (pagination.page) {
            params.page = pagination.page;
        }

        if (pagination.size) {
            params.size = pagination.size;
        }

        const baseUrl = '/';
        const queryString = new URLSearchParams(params).toString();
        const newUrl = `${baseUrl}?${queryString}`;
        await router.navigate(newUrl);
    }
}