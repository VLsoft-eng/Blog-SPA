import {RegisterHandler} from "../handlers/RegisterHandler.js";
import {renderContent} from "../utilities/render/contentRenderUtilities.js";

export class RegisterViewController {
    constructor() {
        this.registerHandler = new RegisterHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await renderContent('resources/templates/auth/register.html');

        const phoneRegisterInput = document.getElementById("phone-register-input");
        const registerForm = document.getElementById('register-form');

        phoneRegisterInput.addEventListener("input", (e) => {
            const input = e.target;
            const value = input.value.replace(/\D/g, "");
            input.value = this.registerHandler.formatPhone(value);
        });

        registerForm.addEventListener('submit',  (e) => this.registerHandler.handle(e));
    }
}