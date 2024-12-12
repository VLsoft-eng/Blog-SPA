import {GetProfileHandler} from "../handlers/GetProfileHandler.js";
import {renderContent} from "../utilities/render/contentRenderUtilities.js";
import {UpdateProfileHandler} from "../handlers/UpdateProfileHandler.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";
import {router} from "/index.js";

export class ProfileViewController {
    constructor() {
        this.getProfileHandler = new GetProfileHandler();
        this.updateProfileHandler = new UpdateProfileHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        if (!TokenUtilities.isAuthorized()) {
            await router.navigate('/notAuthorized');
            return;
        }
        await renderContent("/resources/templates/profile.html");
        await this.getProfileHandler.handle();
        const updateProfileForm = document.getElementById("update-profile-form");
        const phoneProfileInput = document.getElementById("phone-profile-input");
        phoneProfileInput.addEventListener("input", (e) => {
            const input = e.target;
            const value = input.value.replace(/\D/g, "");
            input.value = this.updateProfileHandler.formatPhone(value);
        });
        updateProfileForm.addEventListener("submit", (e) => {
            this.updateProfileHandler.handle(e);
        });
    }

}