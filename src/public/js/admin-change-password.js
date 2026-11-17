import { validatePasswordConfirmation, validateSignupPassword } from './validators.js';
import { bindPasswordVisibility, clearFieldError, showFieldError } from './formValidation.js';

const form = document.getElementById('admin-change-password-form');
const newPassword = document.getElementById('admin-new-password');
const confirmPassword = document.getElementById('admin-confirm-password');
const successDialog = document.getElementById('admin-password-success');

if (form && newPassword && confirmPassword && successDialog) {
    let confirmationTouched = false;

    bindPasswordVisibility(document.querySelector('[aria-controls="admin-new-password"]'), newPassword);
    bindPasswordVisibility(document.querySelector('[aria-controls="admin-confirm-password"]'), confirmPassword);

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
        if (confirmationTouched) validateConfirmation();
    });
    newPassword.addEventListener('blur', validateNewPassword);
    confirmPassword.addEventListener('input', () => {
        confirmationTouched = true;
        validateConfirmation();
    });
    confirmPassword.addEventListener('blur', () => {
        confirmationTouched = true;
        validateConfirmation();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        confirmationTouched = true;
        const passwordValid = validateNewPassword();
        const confirmationValid = validateConfirmation();
        if (!passwordValid) {
            newPassword.focus();
            return;
        }
        if (!confirmationValid) {
            confirmPassword.focus();
            return;
        }

        successDialog.showModal();
    });
}
