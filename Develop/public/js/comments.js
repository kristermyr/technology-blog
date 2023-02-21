const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = document.querySelector('.new-comment-form').dataset.postid;
    const commentContent = document.querySelector('#comment_content').value.trim();
    
    if (commentContent) {
		await fetch('/api/comment', {
			method: 'POST',
			body: JSON.stringify({
				post_id,
				commentContent,
			}),
            headers: {
				'Content-Type': 'application/json'
			}
        });console.log(commentContent)
		document.location.reload();
		
	}
};

document
	.querySelector('.new-comment-form')
	.addEventListener('submit', commentFormHandler);