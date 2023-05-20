const loginFormHandler = async (event) => { // handler for when a user logs in the game starts
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/'); // change this to the correct route
        } else {
            alert('Failed to login');
        }
    }
};
  
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);