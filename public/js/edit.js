const newTitle = document.querySelector('#edit-title');
const newContent = document.querySelector('#edit-content');

document.querySelector('#update-post').addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch(document.location.toString(), {
        method: 'PUT',
        body: JSON.stringify({
            title: newTitle.value.trim(),
            content: newContent.value.trim()
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.href('/dashboard');
    } else {
        alert('Error updating post');
    }
})