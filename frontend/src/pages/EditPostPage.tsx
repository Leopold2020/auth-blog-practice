import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
};

const API = "http://localhost:3000";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  // Hämta befintligt inlägg och fyll i formuläret
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`${API}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        reset({ title: data.title, content: data.content });
      }
    }
    fetchPost();
  }, [id]);

  async function onSubmit(formData: FormData) {
    const res = await fetch(`${API}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("root", { message: data.error ?? "Something went wrong." });
      return;
    }

    navigate("/posts");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title", { required: "Title is required" })} />
        {errors.title && <p role="alert">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" {...register("content", { required: "Content is required" })} />
        {errors.content && <p role="alert">{errors.content.message}</p>}
      </div>

      {errors.root && <p role="alert">{errors.root.message}</p>}

      <button type="submit">Save changes</button>
    </form>
  );
}