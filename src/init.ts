import { loadColorScheme } from "./utils/theme";
loadColorScheme();

document.addEventListener('click', ({ target }) => {
  const details = [...document.querySelectorAll('details.dropdown')];
  if (!details.some(f => f.contains(target as Node))) {
    details.forEach(f => f.removeAttribute('open'));
  } else {
    details.forEach(f => !f.contains(target as Node) ? f.removeAttribute('open') : '');
  }
});