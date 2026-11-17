import { validateEmail, normalizeEmail, validateSigninPassword } from './validators.js';
import { bindFieldValidation, bindEnterNavigation, validateForm, bindPasswordVisibility } from './formValidation.js';

const form = document.getElementById('login-form');
if (form) {
    const email = form.elements.email;
    const password = form.elements.password;
    const button = document.getElementById('btn-login');
    const fields = [
        { input: email, validate: bindFieldValidation(email, validateEmail, { normalize: normalizeEmail }) },
        { input: password, validate: bindFieldValidation(password, validateSigninPassword) }
    ];
    bindPasswordVisibility(document.getElementById('password-toggle'), password);

    let submitting = false;
    const submit = () => {
        if (submitting || !validateForm(fields, form)) return;
        form.requestSubmit(button || undefined);
    };
    bindEnterNavigation(fields, form, submit);
    form.addEventListener('submit', (event) => {
        if (!validateForm(fields, form)) {
            event.preventDefault();
            return;
        }
        if (submitting) return;
        submitting = true;
        if (button) {
            button.setAttribute('aria-busy', 'true');
            button.disabled = true;
        }
    });
    button?.addEventListener('click', (event) => {
        if (!validateForm(fields, form)) event.preventDefault();
    });
}
