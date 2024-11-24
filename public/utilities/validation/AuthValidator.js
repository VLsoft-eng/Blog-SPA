export class UserValidator {
    static errors = [];
    static isValid = true;

    static validateLogin(LoginRecord) {
        this.errors = [];
        this.isValid = true;

        if (!this.isEmailValid(LoginRecord.email)) {
            console.log(LoginRecord.email);
            this.errors.push({ field: 'email-login-input', message: 'Почта не соответствует формату example@mail.com' });
            this.isValid = false;
        }

        if (!this.isPasswordValid(LoginRecord.password)) {
            this.errors.push({ field: 'password-login-input', message: 'Недопустимый пароль' });
            this.isValid = false;
        }

        return this.isValid;
    }

    static validateProfileUpdate(ProfileRecord) {
        this.errors = [];
        this.isValid = true;

        if (!this.isFullNameValid(ProfileRecord.fullName)) {
            this.errors.push({field: 'name-profile-input', message: 'Некорректный формат ФИО'})
            this.isValid = false;
        }

        if (!this.isEmailValid(ProfileRecord.email)) {
            this.errors.push({field: 'email-profile-input', message: 'Почта не соответствует формату example@mail.com'})
            this.isValid = false;
        }

        if (!this.isGenderValid(ProfileRecord.gender)) {
            this.errors.push({field: 'gender-profile-input', message: 'Некорректный формат ФИО'})
            this.isValid = false;
        }

        if (!this.isPhoneValid(ProfileRecord.phone)) {
            this.errors.push({field: 'phone-profile-input', message: 'Телефон не соответствует формату +7 (xxx) xxx-xx-xx'})
            this.isValid = false;
        }

        if (!this.isBirthDateValid(ProfileRecord.birthDate)) {
            this.errors.push({field: 'birth-profile-input', message: 'Некорректный формат даты или дата указана в будущем'})
            this.isValid = false;
        }
    }

    static validateRegister(RegisterRecord) {
        this.errors = [];
        this.isValid = true;

        console.log(RegisterRecord.password + " pass tyt");

        if (!this.isEmailValid(RegisterRecord.email)) {
            this.errors.push({field: 'email-register-input', message: 'Почта не соответствует формату example@mail.com'})
            this.isValid = false;
        }

        if (!this.isFullNameValid(RegisterRecord.fullName)) {
            this.errors.push({field: 'name-register-input', message: 'Некорректный формат ФИО'})
            this.isValid = false;
        }

        if (!this.isPasswordValid(RegisterRecord.password)) {
            this.errors.push({ field: 'password-register-input', message: 'Пароль не может содержать русские буквы, пробелы ' +
                    'и должен содержать хотя бы одну цифру' });
            this.isValid = false;
        }

        if (!this.isGenderValid(RegisterRecord.gender)) {
            this.errors.push({field: 'gender-register-input', message: 'Некорректный формат ФИО'})
            this.isValid = false;
        }

        if (!this.isPhoneValid(RegisterRecord.phone)) {
            this.errors.push({field: 'phone-register-input', message: 'Телефон не соответствует формату +7 (xxx) xxx-xx-xx'})
            this.isValid = false;
        }

        if (!this.isBirthDateValid(RegisterRecord.birthDate)) {
            this.errors.push({field: 'birth-register-input', message: 'Некорректный формат даты или дата указана в будущем'})
            this.isValid = false;
        }
    }

    static isFullNameValid(fullname) {
        const fullnamePattern = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/;
        return fullnamePattern.test(fullname);
    }

    static isGenderValid(gender) {
        return gender === "Male" || gender === "Female";
    }

    static isPhoneValid(phone) {
        const phonePattern = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phonePattern.test(phone);
    }

    static isBirthDateValid(birthDate) {
        const birthDatePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/;
        if (!birthDatePattern.test(birthDate)) {
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateToCheck = new Date(birthDate);

        return dateToCheck <= today;
    }

    static isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    static isPasswordValid(password) {
        const passwordFormat = /^(?!.*[а-яА-ЯёЁ\s])\S{6,}$/;
        return passwordFormat.test(password);
    }
}