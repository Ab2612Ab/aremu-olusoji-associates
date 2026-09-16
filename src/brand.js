const NEW_BRAND = 'Olusoji Aremu Associate';
const WHATSAPP_NUMBER = '2348023209689';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const BRAND_VARIANTS = [
  'Aremu Olusoji & Associates','Aremu Olusoji & Associate','Aremu Olusoji Associates','Aremu Olusoji Associate',
  'Aremu Olusoji and Associates','Aremu Olusoji and Associate','Olusoji Aremu & Associates','Olusoji Aremu & Associate',
  'Olusoji Aremu Associates','Olusoji Aremu and Associates','Olusoji Aremu and Associate'
];
function cleanBrand(value) {
  if (typeof value !== 'string') return value;
  let result = value;
  for (const variant of BRAND_VARIANTS) result = result.split(variant).join(NEW_BRAND);
  return result;
}
function updateWhatsAppLink(el) {
  if (!el || el.tagName !== 'A') return;
  const href = el.getAttribute('href') || '';
  if (href.includes('wa.me/')) {
    const query = href.includes('?') ? href.slice(href.indexOf('?')) : '';
    el.setAttribute('href', `${WHATSAPP_BASE}${query}`);
  }
  if (el.classList.contains('floating-whatsapp') || el.dataset.whatsappContact === 'true') {
    el.textContent = 'Contact me';
    el.setAttribute('aria-label', 'Contact me on WhatsApp');
  }
}
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let value = cleanBrand(node.nodeValue);
    if (value.trim() === 'AREMU OLUSOJI') value = NEW_BRAND;
    if (value.trim() === '& ASSOCIATES' || value.trim() === '&amp; ASSOCIATES') value = '';
    if (value !== node.nodeValue) node.nodeValue = value;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const text of texts) replaceText(text);
  if (node.tagName === 'A') updateWhatsAppLink(node);
  if (node.hasAttribute('aria-label')) node.setAttribute('aria-label', cleanBrand(node.getAttribute('aria-label')));
  if (node.hasAttribute('title')) node.setAttribute('title', cleanBrand(node.getAttribute('title')));
}
function styleContactButton() {
  if (document.getElementById('whatsapp-contact-style')) return;
  const style = document.createElement('style');
  style.id = 'whatsapp-contact-style';
  style.textContent = `
    .floating-whatsapp,.whatsapp-contact{position:fixed!important;right:24px!important;bottom:24px!important;z-index:9999!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:132px!important;height:48px!important;padding:0 20px!important;border:1px solid rgba(224,197,142,.38)!important;border-radius:999px!important;background:rgba(23,20,18,.72)!important;color:#f4efe6!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;box-shadow:0 10px 30px rgba(0,0,0,.18)!important;font:600 12px/1 'DM Sans',Arial,sans-serif!important;letter-spacing:.08em!important;text-transform:uppercase!important;transition:background .25s ease,border-color .25s ease,transform .25s ease,box-shadow .25s ease!important}
    .floating-whatsapp:hover,.whatsapp-contact:hover{background:rgba(59,36,24,.82)!important;border-color:rgba(224,197,142,.62)!important;transform:translateY(-2px)!important;box-shadow:0 14px 34px rgba(0,0,0,.22)!important}
    @media(max-width:640px){.floating-whatsapp,.whatsapp-contact{right:16px!important;bottom:16px!important;min-width:118px!important;width:auto!important;height:44px!important;padding:0 17px!important;font-size:11px!important}.floating-whatsapp-label{display:inline!important}}
  `;
  document.head.appendChild(style);
}
function applyBrand() {
  if (!document.body) return;
  replaceText(document.body);
  document.title = cleanBrand(document.title);
  document.querySelectorAll('a[href*="wa.me/"]').forEach(updateWhatsAppLink);
  document.querySelectorAll('[data-whatsapp-contact]').forEach(updateWhatsAppLink);
  styleContactButton();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyBrand, { once: true });
else applyBrand();
const observer = new MutationObserver(() => applyBrand());
if (document.body) observer.observe(document.body, { subtree: true, childList: true, characterData: true });
