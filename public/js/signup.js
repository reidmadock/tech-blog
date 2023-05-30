const signupFormHandler = async (event) => { // handler for when a user signs up the game starts
    event.preventDefault();

    // const username = document.querySelector('#username-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Provided all name fields are propegated, send fetch to login route
    if (username && password) { 
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
    if (response.ok) {
        document.location.replace('/'); // Navigate to homepage after sign up
    } else {
        alert('Failed to create an account');
    }
  }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);