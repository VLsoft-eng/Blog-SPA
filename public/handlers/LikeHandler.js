import {AbstractHandler} from "./AbstractHandler.js";
import {LikeUseCase} from "../network/usecases/LikeUseCase.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";
import {DislikeUseCase} from "../network/usecases/DislikeUseCase.js";

export class LikeHandler extends AbstractHandler {
    constructor() {
        super();
        this.likeUseCase = new LikeUseCase();
        this.dislikeUseCase = new DislikeUseCase();
    }

    async handle(postElement) {
        if (TokenUtilities.isAuthorized()) {
            const hasLike = postElement.getAttribute("data-isLiked") === "true";
            const likeCountElement = postElement.querySelector("#like-count");
            const likeBtn = postElement.querySelector("#like-btn");
            let likeCount = parseInt(likeCountElement.innerText, 10) || 0;

            try {
                if (hasLike) {
                    await this.dislikeUseCase.execute(postElement.getAttribute("data-guid"));
                    postElement.setAttribute("data-isLiked", "false");
                    likeCount = Math.max(likeCount - 1, 0);
                } else {
                    await this.likeUseCase.execute(postElement.getAttribute("data-guid"));
                    postElement.setAttribute("data-isLiked", "true");
                    likeCount += 1;
                }

                likeBtn.classList.toggle("text-danger");
                likeBtn.classList.toggle("bi-heart");
                likeBtn.classList.toggle("bi-heart-fill");
                likeCountElement.classList.toggle("text-danger");

                likeCountElement.innerText = likeCount;
            } catch (error) {
            }
        }
    }

}