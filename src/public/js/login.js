/**
 * Quizzo — Login Page Script
 * Handles decorative entrance animations and the Alt+D theme shortcut.
 */

(function () {
    'use strict';

    // ── GSAP Animations ────────────────────────────────────────────────────

    function initAnimations() {
        // Guard: skip animations if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Just reveal everything immediately
            document.querySelectorAll(
                '.gsap-brand-logo, .gsap-brand-eyebrow, .gsap-brand-heading, ' +
                '.gsap-brand-sub, .gsap-brand-pills, .gsap-brand-visual, ' +
                '.gsap-brand-footer, .gsap-login-card'
            ).forEach(function (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        if (typeof gsap === 'undefined') {
            // GSAP not loaded yet — wait and retry once
            setTimeout(initAnimations, 150);
            return;
        }

        var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Brand panel — staggered entrance from left
        tl.to('.gsap-brand-logo', {
            opacity: 1,
            x: 0,
            duration: 0.55,
            clearProps: 'transform'
        }, 0.1)
        .fromTo('.gsap-brand-eyebrow', {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0.25)
        .fromTo('.gsap-brand-heading', {
            opacity: 0,
            y: 18
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, 0.35)
        .fromTo('.gsap-brand-sub', {
            opacity: 0,
            y: 12
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0.48)
        .fromTo('.gsap-brand-pills', {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0,
            duration: 0.45
        }, 0.58)
        .fromTo('.gsap-brand-visual', {
            opacity: 0,
            y: 14
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        }, 0.68)
        .fromTo('.gsap-brand-footer', {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.4
        }, 0.78);

        // Login card — elegant card entrance
        tl.fromTo('.gsap-login-card', {
            opacity: 0,
            y: 24
        }, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform'
        }, 0.2);

        // Stagger form elements within the card
        var formEls = document.querySelectorAll(
            '.login-card-header, .login-alert, .btn-google, .form-divider, ' +
            '.login-form .form-field, .form-row, .btn-login'
        );
        if (formEls.length) {
            tl.fromTo(formEls, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: 'power2.out',
                clearProps: 'transform'
            }, 0.4);
        }

        // Subtle floating animation for decorative orb
        var orb = document.querySelector('.deco-orb--mid');
        if (orb) {
            gsap.to(orb, {
                y: -18,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        }

        // Subtle parallax on brand panel blobs (via CSS pseudo-elements tracked by wrapper)
        // We animate a lightweight proxy div instead of pseudo-elements
    }

    // ── Keyboard shortcut: Alt+D toggles theme ─────────────────────────────

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            if (e.altKey && e.key === 'd') {
                if (window.QuizzoTheme) window.QuizzoTheme.toggle();
            }
        });
    }

    // ── Init ───────────────────────────────────────────────────────────────

    function init() {
        initKeyboardShortcuts();

        // Lucide icons need to be re-created if dynamically inserted elements appear
        // The main layout already calls lucide.createIcons() on DOMContentLoaded.

        // Kick off GSAP after a brief frame to ensure layout is painted
        requestAnimationFrame(function () {
            requestAnimationFrame(initAnimations);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

