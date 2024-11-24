import {LoginHandler} from "../handlers/LoginHandler.js";
import {renderContent} from "../utilities/render/contentRenderUtilities.js";

export class LoginViewController {
    constructor () {
        this.loginHandler = new LoginHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await renderContent('resources/templates/auth/login.html');
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit',(e) => this.loginHandler.handle(e))
    }

}