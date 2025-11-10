// Login modal logic
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
  loginMessage.textContent = '';
});
closeModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.style.display = 'none';
});
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Demo: Accept any username/password
  loginMessage.style.color = '#10b981';
  loginMessage.textContent = 'Login successful! (Demo only)';
  setTimeout(() => {
    loginModal.style.display = 'none';
  }, 1200);
});