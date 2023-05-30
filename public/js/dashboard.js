const postTitle = document.querySelector('#title');
const postContent = document.querySelector('#content');
const allEditBtns = document.querySelectorAll('.edit-post');
const allDelBtns = document.querySelectorAll('.delete-post');

document.querySelector('#create-post').addEventListener('submit', async (event) => {
    event.preventDefault();

    const result = await fetch('/api/data/submit', {
        method: "POST",
        body: JSON.stringify({
            title: postTitle.value.trim(),
            content: postContent.value.trim()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    if(result.ok) {
        document.location.reload();
    } else {
        alert('Something went wrong with this post')
    }
})

allEditBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        
        // document.location.href = `/dashboard/edit/${btn.value}`;
        document.location.replace(`/dashboard/edit/${btn.value}`); 
    });
});

allDelBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
        event.preventDefault();

        const response = await fetch(`/api/data/delete/${btn.value}`, {
            method: "DELETE" });
        if(response.ok) {
            document.location.reload();
        } else {
            alert("Something went wrong while deleting");
        }
    });
});