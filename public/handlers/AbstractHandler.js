export class AbstractHandler {
    constructor() {}

    markInvalidFields(errors) {
        errors.forEach((error) => {
            const element = document.getElementById(error.field);
            if (element) {
                element.classList.add('is-invalid');
                const errorContainer = document.getElementById(`${error.field}-error`);
                if (errorContainer) {
                    errorContainer.textContent = error.message;
                }
            }
        });
    }

    clearInvalidFields(errors) {
        errors.forEach((error) => {
            const element = document.getElementById(error.field);
            if (element) {
                const errorContainer = document.getElementById(`${error.field}-error`);
                console.error(errorContainer.textContent);
                if (errorContainer) {
                    errorContainer.textContent = '';
                }
                element.classList.remove('is-invalid');
            }
        });
    }

    formatPhone(value) {
        if (!value) return "";

        if (value.length < 1) {
            return "+7 (" + value;
        }

        const parts = [
            value.slice(0, 1),
            value.slice(1, 4),
            value.slice(4, 7),
            value.slice(7, 9),
            value.slice(9, 11),
        ];

        let formatted = "+7 ";

        if (parts[1]) formatted += `(${parts[1]}`;
        if (parts[2]) formatted += `) ${parts[2]}`;
        if (parts[3]) formatted += `-${parts[3]}`;
        if (parts[4]) formatted += `-${parts[4]}`;

        return formatted;
    }

    formatDate(date) {
        return date.substring(0, date.indexOf('T'));
    }
 }