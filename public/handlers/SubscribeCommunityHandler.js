import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {SubscribeUseCase} from "/network/usecases/SubscribeUseCase.js";

export class SubscribeCommunityHandler extends AbstractHandler {
    constructor() {
        super();

        this.subscribeUseCase = new SubscribeUseCase();
    }

    async handle(communityElement) {
        const communityId = communityElement.getAttribute("data-guid");
        try {
            await this.subscribeUseCase.execute(communityId);
            const subButton = communityElement.querySelector('.sub');
            const unsubButton = communityElement.querySelector('.unsub');

            subButton.classList.add("d-none");
            unsubButton.classList.remove("d-none");
        } catch (error) {
            console.error(error);
        }
    }
}