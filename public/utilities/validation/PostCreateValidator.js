export class PostCreateValidator {
    static errors = [];
    static isValid = true;

    static validatePost(post) {
        this.errors = [];
        this.isValid = true;

        if (!this.validateTitle(post.title)) {
            this.errors.push({ field: 'post-title', message: 'Заголовок не может быть пустым.' });
            this.isValid = false;
        }

        if (!this.validateText(post.description)) {
            this.errors.push({ field: 'post-text', message: 'Текст поста не может быть пустым.' });
            this.isValid = false;
        }

        if (!this.validateReadingTime(post.readingTime)) {
            this.errors.push({ field: 'reading-time', message: 'Время чтения должно быть неотрицательным числом.' });
            this.isValid = false;
        }

        if (!this.validateTags(post.tags)) {
            this.errors.push({field: 'tags-select', message: 'У поста должен быть хотя бы один тег'})
            this.isValid = false;
        }

        if (!this.validateImageUrl(post.image) && post.image !== null) {
            this.errors.push({field: 'image-url', message: 'Должно являться корректной http, https, или ftp ссылкой'})
        }

        return this.isValid;
    }

    static validateTags (tags) {
        return tags && tags.length > 0;
    }

    static validateImageUrl(imageUrl) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(imageUrl);
    }

    static validateReadingTime(time) {
        return typeof time === 'number' && time > 0;
    }

    static validateText(text) {
        return text && text.trim().length > 0;
    }

    static validateTitle(title) {
        return title && title.trim().length > 0;
    }
}
