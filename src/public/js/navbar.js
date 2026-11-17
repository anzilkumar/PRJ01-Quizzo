const nav = document.getElementById('site-nav');
const openButton = document.querySelector('[data-nav-open]');
const closeButton = document.querySelector('[data-nav-close]');
const backdrop = document.querySelector('[data-nav-backdrop]');
const themeButton = document.querySelector('[data-navbar-theme-toggle]');

function updateActiveLink() {
    nav?.querySelectorAll('.site-nav-link').forEach((link) => {
        const target = new URL(link.href, window.location.href);
        const active = target.hash
            ? (target.hash === window.location.hash && Boolean(window.location.hash)) || window.location.pathname.endsWith(target.hash.slice(1))
            : target.pathname === window.location.pathname;

        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

function setThemeIcon(theme) {
    const isDark = theme === 'dark';
    themeButton?.querySelector('[data-navbar-theme-icon="sun"]')?.style.setProperty('display', isDark ? 'none' : '');
    themeButton?.querySelector('[data-navbar-theme-icon="moon"]')?.style.setProperty('display', isDark ? '' : 'none');
    themeButton?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeButton?.setAttribute('aria-pressed', String(isDark));
}

function openDrawer() {
    if (!nav || !openButton || !backdrop) return;
    nav.classList.add('is-open');
    backdrop.hidden = false;
    openButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeButton?.focus();
}

function closeDrawer({ restoreFocus = true } = {}) {
    if (!nav || !openButton || !backdrop) return;
    nav.classList.remove('is-open');
    backdrop.hidden = true;
    openButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (restoreFocus) openButton.focus();
}

openButton?.addEventListener('click', openDrawer);
closeButton?.addEventListener('click', () => closeDrawer());
backdrop?.addEventListener('click', () => closeDrawer());

nav?.querySelectorAll('.site-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) closeDrawer({ restoreFocus: false });
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) closeDrawer();
});

themeButton?.addEventListener('click', () => window.QuizzoTheme?.toggle());
document.addEventListener('quizzo:themechange', (event) => setThemeIcon(event.detail?.theme));

if (window.QuizzoTheme) setThemeIcon(window.QuizzoTheme.current());
updateActiveLink();
window.addEventListener('hashchange', updateActiveLink);
