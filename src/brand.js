const OLD_BRAND = 'Aremu Olusoji & Associates';
const NEW_BRAND = 'Olusoji Aremu Associate';

function replaceBrandText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue && node.nodeValue.includes(OLD_BRAND)) {
      node.nodeValue = node.nodeValue.split(OLD_BRAND).join(NEW_BRAND);
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  for (const attr of ['aria-label', 'title', 'content', 'href']) {
    if (node.hasAttribute(attr)) {
      const value = node.getAttribute(attr);
      if (value && value.includes(OLD_BRAND)) {
        node.setAttribute(attr, value.split(OLD_BRAND).join(NEW_BRAND));
      }
    }
  }

  for (const child of node.childNodes) replaceBrandText(child);
}

function applyBrand() {
  replaceBrandText(document.body);
  document.title = document.title.replaceAll(OLD_BRAND, NEW_BRAND);
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
