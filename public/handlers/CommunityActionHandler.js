import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {GetCommunityRoleUseCase} from "/network/usecases/GetCommunityRoleUseCase.js";
import {SubscribeCommunityHandler} from "/handlers/SubscribeCommunityHandler.js";
import {UnsubscribeCommunityHandler} from "/handlers/UnsubscribeCommunityHandler.js";

export class CommunityActionHandler extends AbstractHandler {
    constructor() {
        super();

        this.getCommunityRoleUseCase = new GetCommunityRoleUseCase();
        this.subscribeCommunityHandler = new SubscribeCommunityHandler();
        this.unsubscribeCommunityHandler = new UnsubscribeCommunityHandler();
    }

    async handle(communityElement) {
        const communityId = communityElement.getAttribute('data-guid');
        const communityRole = await this.getCommunityRoleUseCase.execute(communityId);

        const subButton = communityElement.querySelector('.sub');
        const unsubButton = communityElement.querySelector('.unsub');

        subButton.addEventListener('click', async () => {
            await this.subscribeCommunityHandler.handle(communityElement);
        })

        unsubButton.addEventListener('click', async () => {
            await this.unsubscribeCommunityHandler.handle(communityElement);
        })

        if (!communityRole) {
            subButton.classList.remove("d-none");
        }

        if (communityRole === "Subscriber") {
            unsubButton.classList.remove("d-none");
        }
    }
}