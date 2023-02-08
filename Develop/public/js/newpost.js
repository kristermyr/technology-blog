const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),

        headers: { 'Content-Type': 'application/json' },
        
      });
      console.log("before",title,content);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }console.log("middle",title,content);
    }
    
  document.querySelector('#new-post-form')
  .addEventListener('submit', newPostFormHandler);
