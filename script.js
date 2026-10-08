(() => {
  const supported = new Set(['vi', 'en']);
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('lang');
  const saved = localStorage.getItem('visay-policy-language');
  const browser = navigator.language.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  const language = supported.has(requested)
    ? requested
    : supported.has(saved)
      ? saved
      : browser;

  document.documentElement.lang = language;
  const isTerms = window.location.pathname.endsWith('/terms.html');
  document.title = isTerms
    ? language === 'vi'
      ? 'Visay — Điều khoản sử dụng'
      : 'Visay — Terms of Use'
    : language === 'vi'
      ? 'Visay — Chính sách quyền riêng tư'
      : 'Visay — Privacy Policy';

  document.querySelectorAll('[data-policy]').forEach((policy) => {
    policy.hidden = policy.dataset.policy !== language;
  });

  document.querySelectorAll('[data-language]').forEach((link) => {
    if (link.dataset.language === language) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
    link.addEventListener('click', () => {
      localStorage.setItem('visay-policy-language', link.dataset.language);
    });
  });
})();
