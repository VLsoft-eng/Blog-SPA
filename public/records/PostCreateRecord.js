export class PostCreateRecord {
    constructor(title, description, readingTime, image = null, addressId = null, tags) {
        this.title = title;
        this.description = description;
        this.readingTime = readingTime;
        this.image = image;
        this.addressId = addressId;
        this.tags = tags;
    }
}