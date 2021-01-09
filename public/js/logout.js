const logoutBtn = document.querySelector('#logoutBtn');
//Login
logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = NULL;
  const password = NULL;

    if (response.ok) {
      document.location.replace('/home');
    } else {
      document.querySelector('#logout-error').textContent = 'Failed to logout. Try again.';
    }
  });
