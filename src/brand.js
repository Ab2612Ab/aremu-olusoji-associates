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
  if (!value) return value;
  let result = value;
  for (const variant of BRAND_VARIANTS) {
    result = result.split(variant).join(NEW_BRAND);
  }
  return result;
}

function replaceBrandText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.nodeValue = replaceBrandValue(node.nodeValue);
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  for (const attr of ['aria-label', 'title', 'content', 'href']) {
    if (node.hasAttribute(attr)) {
      const value = node.getAttribute(attr);
      const replaced = replaceBrandValue(value);
      if (replaced !== value) node.setAttribute(attr, replaced);
    }
  }

  for (const child of node.childNodes) replaceBrandText(child);
}

function applyBrand() {
  replaceBrandText(document.documentElement);
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
      for (const node of mutation.addedNodes) replaceBrandText(node);
    } else if (mutation.type === 'characterData') {
      replaceBrandText(mutation.target);
    } else if (mutation.type === 'attributes') {
      replaceBrandText(mutation.target);
    }
  }
});

observer.observe(document.documentElement, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ['aria-label', 'title', 'content', 'href']
});
