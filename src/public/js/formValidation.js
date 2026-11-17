export function showFieldError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    input.setAttribute('aria-invalid', 'true');
    if (error) {
        error.textContent = message;
        error.hidden = false;
        input.setAttribute('aria-describedby', error.id);
    }
}

export function clearFieldError(input) {
    const error = document.getElementById(`${input.id}-error`);
    input.removeAttribute('aria-invalid');
    if (error) {
        error.textContent = '';
        error.hidden = true;
    }
}

export function bindFieldValidation(input, validator, { normalize } = {}) {
    const validate = () => {
        if (normalize) input.value = normalize(input.value);
        const result = validator(input.value);
        if (result.valid) clearFieldError(input);
        else showFieldError(input, result.message);
        return result.valid;
    };
    input.addEventListener('input', () => {
        validate();
    });
    input.addEventListener('blur', () => {
        validate();
    });
    return validate;
}

export function validateForm(fields, form) {
    const invalid = fields.filter((field) => !field.validate());
    if (invalid.length) {
        invalid[0].input.focus();
        return false;
    }
    return true;
}

export function bindEnterNavigation(fields, form, submit) {
    fields.forEach((field, index) => {
        field.input.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' || event.isComposing) return;
            event.preventDefault();
            if (!field.validate()) return;
            if (index < fields.length - 1) fields[index + 1].input.focus();
            else submit();
        });
    });
}

export function bindPasswordVisibility(toggle, input) {
    if (!toggle || !input) return;
    toggle.addEventListener('click', () => {
        const reveal = input.type === 'password';
        input.type = reveal ? 'text' : 'password';
        toggle.setAttribute('aria-label', `${reveal ? 'Hide' : 'Show'} ${toggle.dataset.passwordLabel || 'password'}`);
        toggle.setAttribute('aria-pressed', String(reveal));
        const eye = toggle.querySelector('[data-eye]');
        const eyeOff = toggle.querySelector('[data-eye-off]');
        if (eye) eye.style.display = reveal ? 'none' : '';
        if (eyeOff) eyeOff.style.display = reveal ? '' : 'none';
        input.focus();
    });
}
