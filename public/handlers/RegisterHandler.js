import { AbstractHandler } from "./AbstractHandler.js";
import { UserValidator } from "../utilities/validation/AuthValidator.js";
import { RegisterRecord } from "../records/RegisterRecord.js";
import {RegisterUseCase} from "../network/usecases/RegisterUseCase.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";
import {router} from "../index.js";

export class RegisterHandler extends AbstractHandler {
    constructor() {
        super();
        this.registerUseCase = new RegisterUseCase();
        this.errorMessages = new Map([
            ['DuplicateUserName', [{field: 'email-register-input', message: 'Почта уже занята'}],]
        ])
    }

    async handle(e) {
        e.preventDefault();

        this.clearInvalidFields(UserValidator.errors);

        const email = document.getElementById('email-register-input').value;
        const password = document.getElementById('password-register-input').value;
        const fullname = document.getElementById('name-register-input').value;
        const phone = document.getElementById('phone-register-input').value;
        const gender = document.getElementById('gender-register-input').value;
        const birthday = document.getElementById('birth-register-input').value;

        let registerRecord = new RegisterRecord(fullname, birthday, gender, phone, email, password);

        UserValidator.validateRegister(registerRecord);
        if (!UserValidator.isValid) {
            this.markInvalidFields(UserValidator.errors);
        } else {
            try {
                const token = await this.registerUseCase.execute(registerRecord);
                TokenUtilities.setToken(token);
                await router.navigate('/');
            } catch (error) {
                const errors = [
                    {field: 'email-register-input', message: 'Почта уже занята'}];
                this.markInvalidFields(errors);
            }
        }
    }

}
