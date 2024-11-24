import {LogoutHandler} from "../handlers/LogoutHandler.js";

export class LogoutViewController {
    constructor() {
        this.logoutHandler = new LogoutHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await this.logoutHandler.handle();
    }
}