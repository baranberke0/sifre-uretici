const form = document.getElementById('passwordForm');
const passwordDisplay = document.getElementById('passwordDisplay');
const resultDiv = document.getElementById('result');
const copyBtn = document.getElementById('copyBtn');

form.addEventListener('submit', e => {
  e.preventDefault();

  const base = document.getElementById('baseInput').value.trim();
  const useSpecial = document.getElementById('specialChars').checked;
  const length = parseInt(document.getElementById('lengthInput').value);

  if (!base) return alert('Lütfen temel kelimeyi gir!');
  if (length < 8 || length > 32) return alert('Şifre uzunluğu 8-32 arasında olmalı.');

  const newPassword = generatePassword(base, useSpecial, length);

  passwordDisplay.textContent = newPassword;

  resultDiv.style.display = 'block';
  copyBtn.style.display = 'inline-block';
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordDisplay.textContent)
    .then(() => alert('Şifre panoya kopyalandı!'))
    .catch(() => alert('Kopyalama başarısız oldu.'));
});

function generatePassword(base, useSpecial, length) {
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if (useSpecial) chars += specialChars;

  let password = '';

  while (password.length < length) {
    if (Math.random() < 0.5 && base.length > 0) {
      const char = base.charAt(Math.floor(Math.random() * base.length));
      password += char;
    } else {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      password += char;
    }
  }

  password = password.split('').sort(() => 0.5 - Math.random()).join('');
  return password;
}
