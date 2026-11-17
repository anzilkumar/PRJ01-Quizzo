const SPECIAL_CHARACTERS = new Set(Array.from('!@#$%^&*(),.?":{}|<>_-+=/\\[]~`;\''));
const LOCAL_ATOM_CHARACTERS = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

export function normalizeEmail(value) {
    return String(value ?? '').trim().toLowerCase();
}

export function validateFullName(value) {
    if (!value) return { valid: false, message: 'Full name is required.' };
    if (value.trim() !== value) return { valid: false, message: 'Do not add spaces before or after your name.' };
    if (value.length < 3) return { valid: false, message: 'Name must be at least 3 letters.' };
    if (value.length > 50) return { valid: false, message: 'Name must be no more than 50 letters.' };
    if (!/^[A-Za-z]{3,50}$/.test(value)) return { valid: false, message: 'Use English letters only, with no spaces or symbols.' };
    return { valid: true, message: '' };
}

export function validateEmail(value) {
    const normalized = normalizeEmail(value);
    const fail = (message) => ({ valid: false, message, normalized });
    if (!normalized) return fail('Email address is required.');
    if (/\s/.test(normalized)) return fail('Email address cannot contain spaces.');

    const atIndex = normalized.indexOf('@');
    if (atIndex < 0 || atIndex !== normalized.lastIndexOf('@')) return fail('Enter an email with one @ symbol.');
    const local = normalized.slice(0, atIndex);
    const domain = normalized.slice(atIndex + 1);
    if (local.length < 5 || local.length > 64) {
        return fail('Email username must be between 5 and 64 characters.');
    }
    if (local.startsWith('.') || local.endsWith('.') || local.includes('..') || !LOCAL_ATOM_CHARACTERS.test(local)) {
        return fail('Enter a valid email username.');
    }

    const labels = domain.split('.');
    if (labels.length < 2 || labels.some((label) => !label || label.length > 63 || !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label))) {
        return fail('Enter a valid email domain.');
    }
    const extension = labels.at(-1);
    if (!/^[a-z]{2,63}$/.test(extension)) return fail('Email domain must have a valid ending, such as .com.');

    return { valid: true, message: '', normalized };
}

export function validateSigninPassword(value) {
    if (!value) return { valid: false, message: 'Password is required.' };
    return { valid: true, message: '' };
}

export function validateSignupPassword(value) {
    if (!value) return { valid: false, message: 'Password is required.', requirements: [] };
    const requirements = [];
    if (value.length < 8) requirements.push('at least 8 characters');
    if (!/[A-Z]/.test(value)) requirements.push('one uppercase letter');
    if (!/[a-z]/.test(value)) requirements.push('one lowercase letter');
    if (!/[0-9]/.test(value)) requirements.push('one number');
    if (!Array.from(value).some((character) => SPECIAL_CHARACTERS.has(character))) requirements.push('one special character');
    if (/\s/.test(value)) requirements.push('no spaces');
    return {
        valid: requirements.length === 0,
        message: requirements.length ? `Password needs ${requirements.join(', ')}.` : '',
        requirements
    };
}

export function validatePasswordConfirmation(value, password) {
    if (!value) return { valid: false, message: 'Please confirm your password.' };
    if (/\s/.test(value)) return { valid: false, message: 'Password confirmation cannot contain spaces.' };
    if (value !== password) return { valid: false, message: 'Passwords do not match.' };
    return { valid: true, message: '' };
}
