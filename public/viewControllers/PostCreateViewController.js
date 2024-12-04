import {renderContent} from "/utilities/render/contentRenderUtilities.js";
import {GetTagsHandler} from "/handlers/GetTagsHandler.js";
import {GetCommunityDetailsHandler} from "/handlers/GetCommunityDetailsHandler.js";
import {GetMyCommunitiesHandler} from "/handlers/GetMyCommunitiesHandler.js";
import {TokenUtilities} from "/utilities/TokenUtilities.js";
import {CreatePostHandler} from "/handlers/CreatePostHandler.js";
import {router} from "/index.js";

export class PostCreateViewController {
    constructor() {

        this.lastSelectedAddressData = null;
        this.createPostHandler = new CreatePostHandler();
        this.getTagsHandler = new GetTagsHandler();
        this.getCommunityDetailsHandler = new GetCommunityDetailsHandler();
        this.getMyCommunitiesHandler = new GetMyCommunitiesHandler();
    }

    async onLoad() {
        await headerRenderer.renderHeader();

        if (!TokenUtilities.isAuthorized()) {
            await router.navigate('/notAuthorized');
            return;
        }

        await renderContent("/resources/templates/createPost.html");

        this.template = document.querySelector(".address-selector");
        this.addressContainer = document.getElementById("address-selectors");

        const tags = await this.getTagsHandler.handle();
        const userCommunities = await this.getMyCommunitiesHandler.handle();

        this.updateFilterTags(tags);
        await this.initializeSelectorsChain();
        await this.initializeGroupSelectOptions(userCommunities);

        const postCreateForm = document.querySelector("#post-create-form");
        postCreateForm.addEventListener("submit", async (e) => {
            await this.createPostHandler.handle(e,this.lastSelectedAddressData);
        })
    }

    async initializeGroupSelectOptions(userCommunities) {
        const groupSelector = document.getElementById("group-selector");
        const optionTemplate = groupSelector.querySelector(".group-select-option");
        for (const userCommunity of userCommunities) {
            if (userCommunity.role === "Administrator") {
                const optionElement = optionTemplate.cloneNode(true);
                const communityDetails = await this.getCommunityDetailsHandler.handle(userCommunity.communityId)
                optionElement.textContent = communityDetails.name;
                optionElement.value = communityDetails.id;
                if (window.postCreateState !== null && window.postCreateState.id === communityDetails.id) {
                    optionElement.setAttribute("selected", true);
                    window.postCreateState = null;
                }
                groupSelector.appendChild(optionElement);
            }
        }


    }

    async initializeSelectorsChain() {
        await this.addNewSelector({id: null});
    }

    initializeSelector(selector, parentObjectId) {
        $(selector).select2({
            placeholder: "Выберите элемент адреса",
            ajax: {
                url: "https://blog.kreosoft.space/api/address/search",
                dataType: "json",
                delay: 250,
                data: (params) => ({
                    query: params.term,
                    parentObjectId: parentObjectId || null
                }),
                processResults: (data) => {
                    return {
                        results: data.map(item => ({
                            id: item.objectId,
                            objectGuid: item.objectGuid,
                            text: item.text,
                            objectLevel: item.objectLevel,
                            objectLevelText: item.objectLevelText,
                            'data-object-guid': item.objectGuid
                        }))
                    };
                },
                cache: true
            },
            minimumInputLength: 1
        });
    }

    async addNewSelector(parentData) {
        const newSelectorContainer = this.template.cloneNode(true);
        const label = newSelectorContainer.querySelector("label");
        const select = newSelectorContainer.querySelector("select");

        select.id = `select-${parentData.id}`;
        newSelectorContainer.classList.remove("d-none");
        label.textContent = "Следующий элемент адреса"

        newSelectorContainer.classList.remove("d-none");
        this.addressContainer.appendChild(newSelectorContainer);

        this.initializeSelector(select, parentData.id);
        $(select).on("select2:select", (e) => {
            const selectedData = e.params.data;
            this.clearSelectorsAfter(select);

            const label = select.closest('.address-selector').querySelector('label');
            label.textContent = selectedData.objectLevelText || "Следующий элемент адреса";

            this.lastSelectedAddressData = e.params.data;

            if (selectedData.objectLevel !== "Building") {
                this.addNewSelector(selectedData);
            }
        });
    }

    clearSelectorsAfter(selector) {
        let nextSibling = selector.parentNode.nextElementSibling;
        const elementsToRemove = [];

        while (nextSibling) {
            if (nextSibling.classList.contains("address-selector")) {
                elementsToRemove.push(nextSibling);
            }
            nextSibling = nextSibling.nextElementSibling;
        }

        elementsToRemove.forEach((el) => el.remove());
    }

    updateFilterTags(tags) {
        const tagSelect = document.getElementById("tags-select");
        const optionTemplate = tagSelect.querySelector('.d-none');
        tagSelect.innerText = '';
        tags.forEach(tag => {
            const option = optionTemplate.cloneNode(true);
            option.innerText = tag.name;
            option.setAttribute('value', tag.id);
            option.classList.remove('d-none');
            tagSelect.appendChild(option);
        });
    }
}