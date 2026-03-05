import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  content: string;
};

const API = "http://localhost:3000";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(formData: FormData) {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("root", { message: data.error ?? "Något gick fel" });
      return;
    }

    navigate("/posts");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title", { required: "Title required" })} />
        {errors.title && <p role="alert">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" {...register("content", { required: "Content required" })} />
        {errors.content && <p role="alert">{errors.content.message}</p>}
      </div>

      {errors.root && <p role="alert">{errors.root.message}</p>}

      <button type="submit">Create post</button>
    </form>
  );
}