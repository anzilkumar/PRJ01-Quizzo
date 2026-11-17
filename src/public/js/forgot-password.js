import { normalizeEmail, validateEmail } from './validators.js';
import { bindFieldValidation, showFieldError } from './formValidation.js';

const transferKey = 'quizzo-recovery-email';
const email = document.getElementById('forgot-email');
const form = document.getElementById('forgot-password-form');

if (email) {
    try {
        const transferredEmail = sessionStorage.getItem(transferKey);
        sessionStorage.removeItem(transferKey);
        if (transferredEmail) email.value = transferredEmail;
    } catch {
        // The recovery form remains usable when browser storage is unavailable.
    }
}

if (email && form) {
    const validateEmailField = bindFieldValidation(email, validateEmail, { normalize: normalizeEmail });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validateEmailField()) {
            email.focus();
            return;
        }

        try {
            sessionStorage.setItem(transferKey, email.value);
        } catch {
            showFieldError(email, 'Your email could not be saved for this step. Please allow session storage and try again.');
            return;
        }

        window.location.assign('/verify-code');
    });
}
