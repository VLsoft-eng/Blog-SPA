import {LogoutHandler} from "../handlers/LogoutHandler.js";

export class LogoutViewController {
    constructor(headerRenderer) {
        this.headerRenderer = headerRenderer;
        this.logoutHandler = new LogoutHandler();
    }

    async onLoad() {
        await this.headerRenderer.renderHeader();
        await this.logoutHandler.handle();
    }
}