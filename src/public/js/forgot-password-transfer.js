const forgotLink = document.querySelector('.forgot-link');
const emailInput = document.getElementById('email');
const transferKey = 'quizzo-recovery-email';

forgotLink?.addEventListener('click', () => {
    const normalizedEmail = String(emailInput?.value ?? '').trim().toLowerCase();
    try {
        if (normalizedEmail) sessionStorage.setItem(transferKey, normalizedEmail);
        else sessionStorage.removeItem(transferKey);
    } catch {
        // Navigation still works if session storage is unavailable.
    }
});
