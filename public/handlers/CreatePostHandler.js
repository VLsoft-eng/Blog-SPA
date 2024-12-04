import {AbstractHandler} from "/handlers/AbstractHandler.js";
import {CreatePostUseCase} from "/network/usecases/CreatePostUseCase.js";
import {CreatePostGroupUseCase} from "/network/usecases/CreatePostGroupUseCase.js";
import {router} from "/index.js";
import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {PostCreateValidator} from "/utilities/validation/PostCreateValidator.js";
import {PostCreateRecord} from "/records/PostCreateRecord.js";

export class CreatePostHandler extends AbstractHandler {
    constructor() {
        super();
        this.createPostUseCase = new CreatePostUseCase();
        this.createPostGroupUseCase = new CreatePostGroupUseCase();
    }

    async handle(e, lastSelectedAddressData) {
        e.preventDefault();
        this.clearInvalidFields(PostCreateValidator.errors);

        console.log(e)

        const title = document.getElementById('post-title').value;
        const description = document.getElementById('post-text').value;
        const readingTime = parseInt(document.getElementById('reading-time').value, 10) || 0;
        const imageValue = document.getElementById('image-url').value.trim();
        const imageUrl = imageValue === "" ? null : imageValue;
        const group = document.getElementById('group-selector').value;
        let addressId = lastSelectedAddressData ? lastSelectedAddressData.objectGuid : null;

        const tagsSelect = document.getElementById('tags-select');
        const tags = Array.from(tagsSelect.selectedOptions).map(option => option.value);

        const postCreateRecord = new PostCreateRecord(title, description, readingTime, imageUrl, addressId, tags);

        if (!PostCreateValidator.validatePost(postCreateRecord)) {
            console.log(PostCreateValidator.errors);
            this.markInvalidFields(PostCreateValidator.errors);
            return;
        }

        try {
            if (group !== "without") {
                const postId = await this.createPostGroupUseCase.execute(addressId, postCreateRecord);
                console.log(postId)
                await router.navigate("/post/" + postId);

            } else {
                const postId = await this.createPostUseCase.execute(postCreateRecord);
                await router.navigate("/post/" + postId);
            }
        } catch (error) {
            if (error.errorCode === 404) {
                await router.navigate("/none-exist");
            }

            if (error.errorCode === 403) {
                await renderContent("/resources/templates/forbidden.html");
            }

            if (error.errorCode === 401) {
                await renderContent("/resources/templates/login.html");
            }
        }
    }
}