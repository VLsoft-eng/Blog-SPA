import {renderContent} from "../utilities/render/contentRenderUtilities.js";

export class MainPageViewController {
    constructor(headerRenderer) {
        this.headerRenderer = headerRenderer;
    }

    async onLoad() {
        await this.headerRenderer.renderHeader();
        await renderContent(null)
    }
}