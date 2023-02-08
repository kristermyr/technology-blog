const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-text').value.trim();
    
    

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        title,
        content, 

        headers: { 'Content-Type': 'application/json' },
        loggedIn: true
      });
      console.log("before",title,content);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }console.log("middle",title,content);
    }
    console.log("after",title,content);
  document.querySelector('#new-post-form')
  .addEventListener('#create-post', newPostHandler);
