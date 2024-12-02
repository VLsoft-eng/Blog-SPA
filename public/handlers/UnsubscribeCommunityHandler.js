import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {UnsubscribeUseCase} from "/network/usecases/UnsubscribeUseCase.js";

export class UnsubscribeCommunityHandler extends AbstractHandler {
    constructor() {
        super();

        this.unsubscribeUseCase = new UnsubscribeUseCase();
    }

    async handle(communityElement) {
        const communityId = communityElement.getAttribute("data-guid");
        try {
            await this.unsubscribeUseCase.execute(communityId);
            const subButton = communityElement.querySelector('.sub');
            const unsubButton = communityElement.querySelector('.unsub');

            subButton.classList.remove("d-none");
            unsubButton.classList.add("d-none");
        } catch (error) {
            console.error(error);
        }
    }
}