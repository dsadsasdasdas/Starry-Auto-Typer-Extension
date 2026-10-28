(() => {
  if (globalThis.__starryActiveTargetInstalled) return;
  globalThis.__starryActiveTargetInstalled = true;

  let lastTarget = null;

  const isPanelElement = (element) => element?.closest?.('#etyper-floating-panel');

  const getEditableTarget = (element) => {
    if (!element || isPanelElement(element)) return null;
    if (element.matches?.('textarea, input[type="text"], input[type="search"], input[type="url"], input[type="tel"]')) return element;
    return element.closest?.('[contenteditable="true"]') ?? null;
  };

  const saveTarget = (element) => {
    const target = getEditableTarget(element);
    if (target) lastTarget = target;
  };

  const restoreTarget = () => {
    if (!lastTarget?.isConnected) return;
    lastTarget.focus({ preventScroll: true });
  };

  saveTarget(document.activeElement);

  document.addEventListener('focusin', (event) => saveTarget(event.target), true);
  document.addEventListener('click', (event) => {
    const startButton = event.composedPath().find((node) => node?.id === 'start');
    if (startButton?.closest?.('#etyper-floating-panel') || startButton?.getRootNode?.().host?.id === 'etyper-floating-panel') {
      restoreTarget();
    }
  }, true);
})();
