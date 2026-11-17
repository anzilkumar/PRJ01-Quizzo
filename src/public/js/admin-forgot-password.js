import { normalizeEmail, validateEmail } from './validators.js';
import { bindFieldValidation, showFieldError } from './formValidation.js';

const transferKey = 'quizzo-admin-recovery-email';
const email = document.getElementById('admin-recovery-email');
const form = document.getElementById('admin-forgot-form');

if (email && form) {
    const validateEmailField = bindFieldValidation(email, validateEmail, { normalize: normalizeEmail });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validateEmailField()) return;

        try {
            sessionStorage.setItem(transferKey, email.value);
        } catch {
            showFieldError(email, 'This browser could not temporarily save your email. Please allow session storage and try again.');
            return;
        }

        window.location.assign('/admin/verify-code');
    });
}
