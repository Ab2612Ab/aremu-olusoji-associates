const NEW_BRAND = 'Olusoji Aremu Associate';
const BRAND_VARIANTS = [
  'Aremu Olusoji & Associates',
  'Aremu Olusoji & Associate',
  'Aremu Olusoji Associates',
  'Aremu Olusoji Associate',
  'Aremu Olusoji and Associates',
  'Aremu Olusoji and Associate',
  'Olusoji Aremu & Associates',
  'Olusoji Aremu & Associate',
  'Olusoji Aremu Associates',
  'Olusoji Aremu and Associates',
  'Olusoji Aremu and Associate'
];

function replaceBrandValue(value) {
  if (typeof value !== 'string') return value;
  let result = value;
  for (const variant of BRAND_VARIANTS) result = result.split(variant).join(NEW_BRAND);
  return result;
}

function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const next = replaceBrandValue(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const text of texts) {
    const next = replaceBrandValue(text.nodeValue);
    if (next !== text.nodeValue) text.nodeValue = next;
  }
}

function applyBrand() {
  replaceText(document.body);
  document.title = replaceBrandValue(document.title);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyBrand, { once: true });
} else {
  applyBrand();
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) replaceText(node);
    } else if (mutation.type === 'characterData') {
      replaceText(mutation.target);
    }
  }
});

observer.observe(document.body, { subtree: true, childList: true, characterData: true });
