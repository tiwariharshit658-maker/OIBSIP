const temperatureInput = document.getElementById('temperature');
const fromUnitSelect = document.getElementById('fromUnit');
const convertBtn = document.getElementById('convertBtn');
const resultBox = document.getElementById('result');
const errorBox = document.getElementById('error');
function formatNumber(value) { return Number(value).toFixed(2).replace(/\.00$/, ''); }
function convertTemperature(value, fromUnit) { const celsius = { c: value, f: (value - 32) * 5 / 9, k: value - 273.15 }[fromUnit]; const toCelsius = { c: celsius, f: (celsius * 9 / 5) + 32, k: celsius + 273.15 }; return { c: toCelsius.c, f: toCelsius.f, k: toCelsius.k }; }
convertBtn.addEventListener('click', () => {
  const rawValue = temperatureInput.value.trim();
  errorBox.textContent = '';
  resultBox.innerHTML = '';
  if (rawValue === '' || Number.isNaN(Number(rawValue))) { errorBox.textContent = 'Please enter a valid numeric temperature.'; return; }
  const value = Number(rawValue);
  const fromUnit = fromUnitSelect.value;
  if (fromUnit === 'k' && value < 0) { errorBox.textContent = 'Temperature cannot be below absolute zero. Please use a valid Kelvin value.'; return; }
  if (fromUnit === 'c' && value < -273.15) { errorBox.textContent = 'Temperature cannot be below absolute zero.'; return; }
  if (fromUnit === 'f' && value < -459.67) { errorBox.textContent = 'Temperature cannot be below absolute zero.'; return; }
  const converted = convertTemperature(value, fromUnit);
  resultBox.innerHTML = `<div>Celsius: ${formatNumber(converted.c)}°C</div><div>Fahrenheit: ${formatNumber(converted.f)}°F</div><div>Kelvin: ${formatNumber(converted.k)} K</div>`;
});