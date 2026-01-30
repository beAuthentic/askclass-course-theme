function handleWordClick(e) {
  let link = e.target.closest('a[data-word-click]');
  if (!link) return;

  const fnName = link.dataset.wordClick;
  if (!fnName) return;

  const customFn = window[fnName];
  if (typeof customFn !== 'function') {
    console.warn(`Custom function not found: ${fnName}`);
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  const args = {};
  for (const attr of link.attributes) {
    if (attr.name.startsWith('data-arg-')) {
      const key = attr.name.replace(/^data-arg-/, '');
      args[key] = attr.value;
    }
  }

  try {
    customFn(e, link, args);
  } catch (err) {
    console.error(`Error in word click handler "${fnName}":`, err);
  }
}

function showPopup(title, html) {
  const popup = document.getElementById('course-popup');
  if (!popup) return;

  const header = popup.querySelector('.top-bar');
  const body = popup.querySelector('.body');
  if (header) header.textContent = title;
  if (body) body.innerHTML = html;

  popup.classList.add('show');
  document.body.classList.add('no-scroll');
}

function close(popup) {
  popup.classList.remove('show');
  document.body.classList.remove('no-scroll');
}

function initPopupClose() {
  const popup = document.getElementById('course-popup');
  if (!popup) return;

  popup.querySelector('.tab')?.addEventListener('click', () => close(popup));

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      close(popup);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      close(popup);
    }
  });
}

document.addEventListener('click', handleWordClick, true);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPopupClose);
} else {
  initPopupClose();
}
