import {AbstractHandler} from "./AbstractHandler.js";
import {convertUrlsToLinks} from "../utilities/URLConverter.js";

export class PostReadMoreHandler extends AbstractHandler {
     handle(postElement, postText) {
        const maxLength = 1000;
        const postTextElement = postElement.querySelector("#post-text");
        const readMoreLink = postElement.querySelector("#read-more");

        const descriptionWithLinks = convertUrlsToLinks(postText);

        if (descriptionWithLinks.length === 1 && descriptionWithLinks[0].nodeType === 3) {
            this.handleSingleTextNode(postTextElement, readMoreLink, descriptionWithLinks[0], maxLength);
        } else {
            this.handleMultipleNodes(postTextElement, readMoreLink, descriptionWithLinks, maxLength);
        }
    }

    handleSingleTextNode(postTextElement, readMoreLink, textNode, maxLength) {
        const fullText = textNode.textContent;

        if (fullText.length > maxLength) {
            postTextElement.textContent = fullText.slice(0, maxLength) + "...";
            readMoreLink.classList.remove('d-none');
            this.setupReadMoreLink(readMoreLink, postTextElement, fullText);
        } else {
            postTextElement.textContent = fullText;
            readMoreLink.classList.add('d-none');
        }
    }

    handleMultipleNodes(postTextElement, readMoreLink, descriptionWithLinks, maxLength) {
        const fullText = this.getFullText(descriptionWithLinks);

        if (fullText.length > maxLength) {
            postTextElement.innerHTML = this.truncateText(descriptionWithLinks, maxLength);
            readMoreLink.classList.remove('d-none');
            this.setupReadMoreLink(readMoreLink, postTextElement, fullText);
        } else {
            postTextElement.innerHTML = fullText;
            readMoreLink.classList.add('d-none');
        }
    }

    getFullText(descriptionWithLinks) {
        return descriptionWithLinks.map(node =>
            node.nodeType === 3 ? node.textContent : node.outerHTML).join('');
    }

    truncateText(descriptionWithLinks, maxLength) {
        let truncatedText = '';
        let charCount = 0;
        let remainingText = true;

        for (let node of descriptionWithLinks) {
            const nodeText = node.nodeType === 3 ? node.textContent : node.outerHTML;
            charCount += nodeText.length;

            if (remainingText && charCount <= maxLength) {
                truncatedText += nodeText;
            } else if (charCount > maxLength && remainingText) {
                truncatedText += '...';
                remainingText = false;
            }
        }

        return truncatedText;
    }

    setupReadMoreLink(readMoreLink, postTextElement, fullText) {
        readMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            postTextElement.innerHTML = fullText;
            readMoreLink.classList.add('d-none');
        });
    }
}