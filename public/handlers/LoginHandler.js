import {LoginRecord} from "../records/LoginRecords.js";
import {UserValidator} from "../utilities/validation/AuthValidator.js";
import {AbstractHandler} from "./AbstractHandler.js";
import {LoginUseCase} from "../network/usecases/loginUseCase.js";
import {router} from "../index.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";

export class LoginHandler extends AbstractHandler {
    constructor() {
        super();
        this.loginUseCase = new LoginUseCase();
    }

    async handle(e) {
        e.preventDefault();

        this.clearInvalidFields(UserValidator.errors);

        const email = document.getElementById('email-login-input').value;
        const password = document.getElementById('password-login-input').value;

        let loginRecord = new LoginRecord(email, password);

        UserValidator.validateLogin(loginRecord);
        if (!UserValidator.isValid) {
            this.markInvalidFields(UserValidator.errors);
        } else {
            try {
                const token = await this.loginUseCase.execute(loginRecord);
                TokenUtilities.setToken(token);
                await router.navigate('/');
            } catch (error) {
                const errors = [
                    {field: 'email-login-input', message: 'Неверная почта или пароль'}, {
                        field: 'password-login-input', message: '',
                    }];
                this.markInvalidFields(errors);
                console.log(error);
            }
        }
    }
}

