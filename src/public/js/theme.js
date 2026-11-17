/**
 * Quizzo — Theme System
 * Handles light/dark mode toggle, persistence, and smooth transitions.
 * This script is loaded on every page via the main layout.
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'quizzo-theme';
    const THEMES = { LIGHT: 'light', DARK: 'dark' };

    // ── Internal helpers ───────────────────────────────────────────────────

    function getStoredTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch { /* storage unavailable */ }
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        root.classList.remove(THEMES.LIGHT, THEMES.DARK);
        root.classList.add(theme);
        storeTheme(theme);

        // Update all toggle buttons / icons on the page
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            updateToggleButton(btn, theme);
        });

        // Dispatch a custom event so individual pages can react if needed
        document.dispatchEvent(new CustomEvent('quizzo:themechange', { detail: { theme: theme } }));
    }

    function getCurrentTheme() {
        const root = document.documentElement;
        if (root.classList.contains(THEMES.DARK)) return THEMES.DARK;
        if (root.classList.contains(THEMES.LIGHT)) return THEMES.LIGHT;
        return getStoredTheme() === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;
    }

    function toggleTheme() {
        const current = getCurrentTheme();
        const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        applyTheme(next);
    }

    // ── Toggle button icon update ──────────────────────────────────────────

    function updateToggleButton(btn, theme) {
        const sunIcon  = btn.querySelector('[data-theme-icon="sun"]');
        const moonIcon = btn.querySelector('[data-theme-icon="moon"]');
        const label    = btn.querySelector('[data-theme-label]');

        if (theme === THEMES.DARK) {
            if (sunIcon)  sunIcon.style.display  = '';
            if (moonIcon) moonIcon.style.display = 'none';
            if (label) label.textContent = 'Light mode';
            btn.setAttribute('aria-label', 'Switch to light mode');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            if (sunIcon)  sunIcon.style.display  = 'none';
            if (moonIcon) moonIcon.style.display = '';
            if (label) label.textContent = 'Dark mode';
            btn.setAttribute('aria-label', 'Switch to dark mode');
            btn.setAttribute('aria-pressed', 'false');
        }
    }

    // ── Initialise ─────────────────────────────────────────────────────────

    function init() {
        const theme = getStoredTheme() === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;
        // Apply immediately — the inline script in <head> already set the class,
        // but we also set it here in case this script loads standalone.
        applyTheme(theme);

        // Wire up all toggle buttons present in the DOM now
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', toggleTheme);
            // Set keyboard support (Space / Enter already handled by button element)
        });

        // Watch for future toggles added to the DOM (e.g., SPA navigation)
        // Using event delegation on document for data-theme-toggle attribute
        document.addEventListener('click', function (e) {
            const btn = e.target.closest('[data-theme-toggle]');
            if (btn && !btn._quizzoThemeWired) {
                // Already handled by direct listeners; this is a safety net
            }
        });

    }

    // Run on DOMContentLoaded (or immediately if already loaded)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ── Public API (accessible via window.QuizzoTheme) ─────────────────────
    window.QuizzoTheme = {
        apply:   applyTheme,
        toggle:  toggleTheme,
        current: getCurrentTheme
    };

})();

