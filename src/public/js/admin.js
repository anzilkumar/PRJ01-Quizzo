document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const sidebar = document.querySelector('#admin-sidebar');
  const scrim = document.querySelector('[data-close-menu]');
  const closeMenu = () => { sidebar?.classList.remove('is-open'); if (scrim) scrim.hidden = true; };
  document.querySelector('[data-open-menu]')?.addEventListener('click', () => { sidebar?.classList.add('is-open'); if (scrim) scrim.hidden = false; });
  scrim?.addEventListener('click', closeMenu);
  document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => document.body.classList.toggle('admin-dark'));
  const profile = document.querySelector('[data-profile-menu]');
  document.querySelector('[data-menu-toggle]')?.addEventListener('click', (event) => { const open = profile.hidden; profile.hidden = !open; event.currentTarget.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('[data-password-toggle]').forEach(button => button.addEventListener('click', () => {
    const input = button.closest('.input-wrap')?.querySelector('input'); if (!input) return;
    const visible = input.type === 'password'; input.type = visible ? 'text' : 'password'; button.setAttribute('aria-pressed', String(visible)); button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
    const eye = button.querySelector('[data-eye]'); const eyeOff = button.querySelector('[data-eye-off]');
    if (eye) eye.style.display = visible ? 'none' : '';
    if (eyeOff) eyeOff.style.display = visible ? '' : 'none';
  }));
  let toastTimer;
  const showToast = message => { const toast = document.querySelector('[data-toast-box]'); if (!toast) return; toast.textContent = message; toast.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { toast.hidden = true; }, 2800); };
  document.querySelectorAll('[data-toast]').forEach(el => el.addEventListener('click', () => showToast(el.dataset.toast)));
  document.querySelectorAll('[data-range-tabs]');
  document.querySelectorAll('.range-tab').forEach(tab => tab.addEventListener('click', () => { document.querySelectorAll('.range-tab').forEach(item => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', String(item === tab)); }); }));
  const search = document.querySelector('[data-search]');
  search?.addEventListener('input', () => {
    const term = search.value.trim().toLowerCase(); let visible = 0;
    document.querySelectorAll('[data-row]').forEach(row => { const show = row.textContent.toLowerCase().includes(term); row.hidden = !show; if (show) visible++; });
    const empty = document.querySelector('[data-empty]'); if (empty) empty.hidden = visible > 0;
    const count = document.querySelector('[data-result-count]'); if (count) count.textContent = `Showing ${visible} illustrative record${visible === 1 ? '' : 's'}`;
  });
  const filter = document.querySelector('[data-filter]');
  filter?.addEventListener('change', () => {
    const term = (search?.value || '').toLowerCase(); let visible = 0;
    document.querySelectorAll('[data-row]').forEach(row => { const show = row.textContent.toLowerCase().includes(term) && (!filter.value || row.textContent.includes(filter.value)); row.hidden = !show; if (show) visible++; });
    const empty = document.querySelector('[data-empty]'); if (empty) empty.hidden = visible > 0;
    const count = document.querySelector('[data-result-count]'); if (count) count.textContent = `Showing ${visible} illustrative record${visible === 1 ? '' : 's'}`;
  });
  const dialog = document.querySelector('[data-preview-dialog]');
  document.querySelectorAll('[data-row-menu]').forEach(button => button.addEventListener('click', () => {
    const row = button.closest('tr'); const title = row?.querySelector('.row-primary')?.textContent || 'Sample record';
    const copy = dialog?.querySelector('[data-dialog-copy]'); const heading = dialog?.querySelector('#preview-title'); const link = dialog?.querySelector('[data-dialog-link]');
    if (copy) copy.textContent = `${title} is illustrative sample content. No record actions are connected.`;
    if (heading) heading.textContent = title;
    if (link) link.href = row?.querySelector('.row-primary')?.href || '/admin';
    dialog?.showModal();
  }));
  document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.querySelector('[data-editor-form]')?.addEventListener('submit', event => { event.preventDefault(); showToast('Preview only — nothing was saved.'); });
  if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from('.admin-content > *', { y: 10, opacity: 0, duration: .42, stagger: .06, ease: 'power2.out' });
});
