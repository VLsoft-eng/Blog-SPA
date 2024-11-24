import {renderContent} from "../utilities/render/contentRenderUtilities.js";

export class MainPageViewController {
    constructor() {
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await renderContent(null)
    }
}