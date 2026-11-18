import { normalizeEmail, validateEmail } from './validators.js';
import { bindFieldValidation, bindEnterNavigation } from './formValidation.js';

const form = document.querySelector('[data-login-form]');

if (form) {
    const email = form.querySelector('#admin-email');
    const password = form.querySelector('#admin-password');

    const validateEmailField = bindFieldValidation(email, (value) => {
        const result = validateEmail(value);
        email.dataset.valid = String(result.valid);
        return result;
    }, { normalize: normalizeEmail });

    const validatePasswordField = bindFieldValidation(password, (value) => {
        const valid = value.length > 0;
        password.dataset.valid = String(valid);
        return { valid, message: valid ? '' : 'Password is required.' };
    });

    const fields = [
        { input: email, validate: validateEmailField },
        { input: password, validate: validatePasswordField }
    ];
    bindEnterNavigation(fields, form, () => form.requestSubmit());

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        validateEmailField();
        validatePasswordField();
    });
}
