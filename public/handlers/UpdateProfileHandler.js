import {AbstractHandler} from "./AbstractHandler.js";
import {UpdateProfileUseCase} from "../network/usecases/UpdateProfileUseCase.js";
import {UserValidator} from "../utilities/validation/AuthValidator.js";
import {router} from "../index.js";
import {UpdateProfileRecord} from "../records/UpdateProfileRecord.js";

export class UpdateProfileHandler extends AbstractHandler {
    constructor() {
        super();
        this.updateProfileUseCase = new UpdateProfileUseCase()
    }

    async handle(e) {
        e.preventDefault();

        this.clearInvalidFields(UserValidator.errors);
        console.log(UserValidator.errors)

        const email = document.getElementById('email-profile-input').value;
        const fullname = document.getElementById('name-profile-input').value;
        const phone = document.getElementById('phone-profile-input').value;
        const gender = document.getElementById('gender-profile-input').value;
        const birthday = document.getElementById('birth-profile-input').value;

        let updateProfileRecord = new UpdateProfileRecord(fullname, birthday, gender, phone, email);

        UserValidator.validateProfileUpdate(updateProfileRecord);

        if (!UserValidator.isValid) {
            this.markInvalidFields(UserValidator.errors);
        } else {
            try {
                await this.updateProfileUseCase.execute(updateProfileRecord);
                this.clearInvalidFields(UserValidator.errors);
                await router.navigate('/profile');
            } catch (error) {
                console.log(error)
                const errors = [{field: 'email-profile-input', message: 'Почта уже занята'}];
                this.markInvalidFields(errors);
            }
        }
    }
}