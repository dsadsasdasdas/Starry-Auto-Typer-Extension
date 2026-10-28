// Please do not copy or redistribute this code without permission.
(() => {
  if (globalThis.__starryBrandingInstalled) return;
  globalThis.__starryBrandingInstalled = true;

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.action !== 'togglePanel') return;

    const root = document.querySelector('#etyper-floating-panel')?.shadowRoot;
    if (!root) return;

    const title = root.querySelector('h1');
    const dialog = root.querySelector('[aria-label="ETyper"]');
    const closeButton = root.querySelector('button.close');

    if (title) title.textContent = 'Starry';
    if (dialog) dialog.setAttribute('aria-label', 'Starry');
    if (closeButton) closeButton.setAttribute('aria-label', 'Close Starry');

    if (!root.querySelector('#starry-close-alignment')) {
      const style = document.createElement('style');
      style.id = 'starry-close-alignment';
      style.textContent = `
        button.close {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          line-height: 1 !important;
        }
        button.close::before { content: none !important; }
        button.close { text-indent: 0 !important; }
      `;
      root.append(style);
    }
  });
})();
