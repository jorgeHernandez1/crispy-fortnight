const loginBtn = document.querySelector('#loginBtn');
//Login
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-pw').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/session', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      document.querySelector('#login-error').textContent = 'Failed to login. Try again.';
    }
  }
});
