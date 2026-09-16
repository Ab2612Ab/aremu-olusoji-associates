const NEW_BRAND = 'Olusoji Aremu Associate';
const WHATSAPP = 'https://wa.me/2347031280458';
const BRAND_VARIANTS = [
  'Aremu Olusoji & Associates','Aremu Olusoji & Associate','Aremu Olusoji Associates','Aremu Olusoji Associate',
  'Aremu Olusoji and Associates','Aremu Olusoji and Associate','Olusoji Aremu & Associates','Olusoji Aremu & Associate',
  'Olusoji Aremu Associates','Olusoji Aremu and Associates','Olusoji Aremu and Associate'
];
function replaceBrandValue(value) {
  if (typeof value !== 'string') return value;
  let result = value;
  for (const variant of BRAND_VARIANTS) result = result.split(variant).join(NEW_BRAND);
  return result;
}
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let value = node.nodeValue;
    if (value.trim() === 'AREMU OLUSOJI') value = value.replace('AREMU OLUSOJI', NEW_BRAND);
    else if (value.trim() === '& ASSOCIATES') value = '';
    else value = replaceBrandValue(value);
    if (value !== node.nodeValue) node.nodeValue = value;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const text of texts) replaceText(text);
}
function addContactButton() {
  if (!document.body || document.querySelector('[data-whatsapp-contact]')) return;
  if (!document.getElementById('whatsapp-contact-style')) {
    const style = document.createElement('style');
    style.id = 'whatsapp-contact-style';
    style.textContent = `
      .whatsapp-contact{position:fixed;right:24px;bottom:24px;z-index:9999;display:inline-flex;align-items:center;justify-content:center;min-width:132px;height:48px;padding:0 20px;border:1px solid rgba(224,197,142,.45);border-radius:999px;background:rgba(11,10,9,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 10px 30px rgba(0,0,0,.22);color:#f4efe6;text-decoration:none;font:600 12px/1 'DM Sans',Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;transition:background .25s ease,border-color .25s ease,transform .25s ease,box-shadow .25s ease}.whatsapp-contact:hover{background:rgba(59,36,24,.94);border-color:rgba(224,197,142,.75);transform:translateY(-2px);box-shadow:0 14px 34px rgba(0,0,0,.28)}.whatsapp-contact:focus-visible{outline:2px solid #e0c58e;outline-offset:3px}@media(max-width:700px){.whatsapp-contact{right:16px;bottom:16px;min-width:118px;height:44px;padding:0 17px;font-size:11px}}
    `;
    document.head.appendChild(style);
  }
  const link = document.createElement('a');
  link.href = WHATSAPP;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.className = 'whatsapp-contact';
  link.dataset.whatsappContact = 'true';
  link.setAttribute('aria-label', 'Contact me on WhatsApp');
  link.textContent = 'Contact me';
  document.body.appendChild(link);
}
function applyBrand() {
  if (!document.body) return;
  replaceText(document.body);
  document.title = replaceBrandValue(document.title);
  addContactButton();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyBrand, { once: true });
else applyBrand();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') for (const node of mutation.addedNodes) replaceText(node);
    else if (mutation.type === 'characterData') replaceText(mutation.target);
  }
  addContactButton();
});
if (document.body) observer.observe(document.body, { subtree: true, childList: true, characterData: true });
