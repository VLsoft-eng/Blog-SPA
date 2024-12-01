import {renderContent} from "/utilities/render/contentRenderUtilities.js";

export class PostDetailsViewController {
    constructor() {

    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/postDetails.html");
    }
}