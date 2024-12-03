import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {GetCommunitiesHandler} from "/handlers/GetCommunitiesHandler.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {CommunityActionHandler} from "/handlers/CommunityActionHandler.js";

export class CommunitiesViewController {
    constructor() {
        this.getCommunitiesHandler = new GetCommunitiesHandler();
        this.communityActionHndler = new CommunityActionHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();
        await renderContent("/resources/templates/communities.html");
        const communities = await this.getCommunitiesHandler.handle();
        await this.displayCommunities(communities);

    }

    async displayCommunities(communities) {
        const communityContainer = document.getElementById("communities");
        const communityTemplate = communityContainer.querySelector(".card");

        for (const community of communities) {
            const communityElement = communityTemplate.cloneNode(true);
            const communityTextElement = communityElement.querySelector(".comm-title");
            console.log(community.name);

            communityTextElement.textContent = community.name;
            communityElement.setAttribute("data-guid", community.id);
            communityTextElement.href = "/community/" + community.id;

            if (!TokenUtilities.isAuthorized()) {
                communityElement.classList.remove('d-none');
                communityContainer.appendChild(communityElement);
                continue;
            }

            await this.communityActionHndler.handle(communityElement);

            communityElement.classList.remove('d-none');
            communityContainer.appendChild(communityElement);
        }
    }
}