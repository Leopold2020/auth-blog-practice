import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:3000";

interface Post {
    id: number;
    title: string;
    content: string;
    author: { id: number; email: string};
}

export default function PostsPage() {
    const [posts, setPost] = useState<Post[]>([]); //sparar alla posts
    const [loading, setLoading] = useState(true);
//denna körs när sidan laddar och hämtar posts
   
async function handleDelete(id: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

useEffect(() => {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) setPost(data);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p>Loading...</p>;
if (posts.length === 0) return <p>No posts found</p>;

    return (
        <div>
            <h1>Posts</h1>

            {posts.map((post) => ( //loop
                <div key={post.id} style={{ marginBottom: "20px" }}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>Author: {post.author.email}</small>
                    <br />
                    <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                    <br />
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}