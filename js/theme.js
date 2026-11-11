const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const densitySelect = document.querySelector('#density-select');

function readSetting(key, allowed, fallback) {
  try { const value = localStorage.getItem(key); return allowed.includes(value) ? value : fallback; }
  catch { return fallback; }
}
function saveSetting(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Настройки работают и без сохранения. */ }
}
function applyTheme(value) {
  if (value === 'auto') root.removeAttribute('data-theme');
  else root.dataset.theme = value;
  themeSelect.value = value;
}
function applyDensity(value) {
  if (value === 'compact') root.dataset.density = value;
  else root.removeAttribute('data-density');
  densitySelect.value = value;
}
applyTheme(readSetting('atlas-theme', ['auto', 'light', 'dark'], 'auto'));
applyDensity(readSetting('atlas-density', ['normal', 'compact'], 'normal'));
themeSelect.addEventListener('change', () => { applyTheme(themeSelect.value); saveSetting('atlas-theme', themeSelect.value); });
densitySelect.addEventListener('change', () => { applyDensity(densitySelect.value); saveSetting('atlas-density', densitySelect.value); });
document.querySelector('#demo-action').addEventListener('click', () => {
  document.querySelector('#demo-feedback').textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});
