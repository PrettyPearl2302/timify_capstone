import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    userId: '',
  });

  useEffect(() => {
    const fetchPodcasts = async () => {
      const response = await fetch('http://localhost:3000/podcasts');
      const data = await response.json();
      setPodcasts(data);
    };
    fetchPodcasts();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/podcasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newPodcast = await response.json();
    setPosts([newPodcast, ...podcasts]);
  };

  return (
    <div className="app">
      <form className="new-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
        />
        <input
          type="text"
          name="userId"
          placeholder="User Id"
          value={form.userId}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <div className="posts-container">
        {podcasts.map((podcast) => (
          <div className="post" key={podcast.id}>
            <h2>{post.title}</h2>
            <h4>By {post.user.username} at {new Date(post.createdAt).toLocaleString()}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;