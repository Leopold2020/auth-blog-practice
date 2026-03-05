import { useState, useEffect } from "react";


interface Post {
    id: number;
    title: string;
    content: string;
    author: { id: number; email: string};
}

export default function PostsPage() {
    const [posts, setPost] = useState<Post[]>([]); //sparar alla posts

//denna körs när sidan laddar och hämtar posts
    useEffect(() => {
        fetch("http://localhost:3000/post")
        .then((res) => res.json())
        .then((data) => {
            setPost(data);//sparar datan från API
        })
        .catch((error) => {
            console.error("kan ej hämta posts!!");
        });
    }, []);

    return (
        <div>
            <h1>Posts</h1>

            {posts.map((post) => ( //loop
                <div key={post.id} style={{ marginBottom: "20px" }}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>Author: {post.author.email}</small>
                </div>
            ))}
        </div>
    );
}