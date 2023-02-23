const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    console.log('checking title', title, content);
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),

        headers: { 'Content-Type': 'application/json' },
        
      });
      console.log('response',response);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    
  document.querySelector('#new-post-form')
  .addEventListener('submit', newPostFormHandler);
