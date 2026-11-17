import { validatePasswordConfirmation, validateSignupPassword } from './validators.js';
import { bindPasswordVisibility, clearFieldError, showFieldError } from './formValidation.js';

const form = document.getElementById('change-password-form');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const successModal = document.getElementById('password-success-modal');
const continueToLoginButton = document.getElementById('continue-to-login-button');
const page = document.getElementById('change-password-page');

if (form && newPassword && confirmPassword && successModal && page) {
    let successModalOpen = false;

    bindPasswordVisibility(document.getElementById('new-password-toggle'), newPassword);
    bindPasswordVisibility(document.getElementById('confirm-password-toggle'), confirmPassword);

    const validateNewPassword = () => {
        const result = validateSignupPassword(newPassword.value);
        if (result.valid) clearFieldError(newPassword);
        else showFieldError(newPassword, result.message);
        return result.valid;
    };

    const validateConfirmation = () => {
        const result = validatePasswordConfirmation(confirmPassword.value, newPassword.value);
        if (result.valid) clearFieldError(confirmPassword);
        else showFieldError(confirmPassword, result.message);
        return result.valid;
    };

    newPassword.addEventListener('input', () => {
        validateNewPassword();
        if (confirmPassword.value) validateConfirmation();
    });
    newPassword.addEventListener('blur', validateNewPassword);
    confirmPassword.addEventListener('input', validateConfirmation);
    confirmPassword.addEventListener('blur', validateConfirmation);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (successModalOpen) return;

        const passwordIsValid = validateNewPassword();
        const confirmationIsValid = validateConfirmation();

        if (!passwordIsValid) {
            newPassword.focus();
            return;
        }
        if (!confirmationIsValid) {
            confirmPassword.focus();
            return;
        }

        successModalOpen = true;
        successModal.hidden = false;
        page.inert = true;
        document.body.style.overflow = 'hidden';
        continueToLoginButton?.focus();
    });

    continueToLoginButton?.addEventListener('click', () => {
        window.location.assign('/');
    });
}
