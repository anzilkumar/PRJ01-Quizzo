const transferKey = 'quizzo-recovery-email';
const inputs = Array.from(document.querySelectorAll('.otp-digit'));
const form = document.getElementById('verify-code-form');
const error = document.getElementById('otp-code-error');
const emailDisplay = document.getElementById('recovery-email-display');

try {
    const storedEmail = sessionStorage.getItem(transferKey);
    if (storedEmail && emailDisplay) emailDisplay.textContent = storedEmail;
} catch {
    // Keep the verification form usable when browser storage is unavailable.
}

function showError(message) {
    if (error) {
        error.textContent = message;
        error.hidden = false;
    }
    inputs.forEach((input) => input.setAttribute('aria-invalid', 'true'));
}

function clearError() {
    if (error) {
        error.textContent = '';
        error.hidden = true;
    }
    inputs.forEach((input) => input.removeAttribute('aria-invalid'));
}

function updateFilledState(input) {
    input.classList.toggle('is-filled', input.value.length === 1);
}

function distributeCode(code) {
    if (!/^\d{6}$/.test(code)) {
        showError('Enter a complete 6-digit numeric code.');
        return false;
    }

    code.split('').forEach((digit, index) => {
        inputs[index].value = digit;
        updateFilledState(inputs[index]);
    });
    clearError();
    inputs[inputs.length - 1]?.focus();
    return true;
}

inputs.forEach((input, index) => {
    input.addEventListener('beforeinput', (event) => {
        if (event.inputType.startsWith('insert') && event.data && !/^\d+$/.test(event.data)) {
            event.preventDefault();
            showError('Use numbers only in the verification code.');
        }
    });

    input.addEventListener('input', () => {
        if (input.value.length > 1) {
            if (!distributeCode(input.value)) {
                input.value = '';
                updateFilledState(input);
            }
            return;
        }
        if (input.value && !/^\d$/.test(input.value)) {
            input.value = '';
            updateFilledState(input);
            showError('Use numbers only in the verification code.');
            return;
        }

        updateFilledState(input);
        if (input.value) {
            clearError();
            if (index < inputs.length - 1) inputs[index + 1].focus();
        } else {
            clearError();
        }
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            if (input.value) {
                event.preventDefault();
                input.value = '';
                updateFilledState(input);
                clearError();
            } else if (index > 0) {
                event.preventDefault();
                inputs[index - 1].value = '';
                updateFilledState(inputs[index - 1]);
                inputs[index - 1].focus();
                clearError();
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputs[index - 1].focus();
        } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('paste', (event) => {
        event.preventDefault();
        const pastedCode = event.clipboardData?.getData('text')?.trim() || '';
        distributeCode(pastedCode);
    });
});

form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = inputs.map((input) => input.value).join('');
    if (!/^\d{6}$/.test(code)) {
        showError('Enter all 6 digits to continue.');
        inputs.find((input) => !input.value)?.focus();
        return;
    }

    try {
        sessionStorage.removeItem(transferKey);
    } catch {
        // Navigation remains available when browser storage is blocked.
    }
    window.location.assign('/change-password');
});

requestAnimationFrame(() => inputs[0]?.focus());
