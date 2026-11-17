import { validateFullName, validateEmail, normalizeEmail, validateSignupPassword } from './validators.js';
import { bindFieldValidation, bindEnterNavigation, validateForm, bindPasswordVisibility } from './formValidation.js';

const form = document.getElementById('signup-form');
if (form) {
    const name = form.elements.name;
    const email = form.elements.email;
    const password = form.elements.password;
    const referralCode = form.elements.referralCode;
    const button = document.getElementById('btn-signup');
    const validateName = bindFieldValidation(name, validateFullName);
    const validateEmailField = bindFieldValidation(email, validateEmail, { normalize: normalizeEmail });
    const validatePassword = bindFieldValidation(password, validateSignupPassword);
    const validateReferralCode = () => {
        referralCode.value = referralCode.value.trim();
        return true;
    };

    const fields = [
        { input: name, validate: validateName },
        { input: email, validate: validateEmailField },
        { input: password, validate: validatePassword },
        { input: referralCode, validate: validateReferralCode }
    ];
    bindPasswordVisibility(document.getElementById('password-toggle'), password);

    let submitted = false;
    const submit = () => {
        if (submitted || !validateForm(fields, form)) return;
        submitted = true;
        if (button) button.disabled = true;
        // Signup remains frontend-only; valid input is not sent to a server.
    };
    bindEnterNavigation(fields, form, submit);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (submitted || !validateForm(fields, form)) return;
        submitted = true;
        if (button) button.disabled = true;
    });
    button?.addEventListener('click', submit);
}
