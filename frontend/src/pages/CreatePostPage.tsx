import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function CreatePostPage() {
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
// const [error, setError] = useState("");
const navigate = useNavigate();
const API = "http://localhost:3000";

const { register, setError, formState: { errors } } = useForm();

  const token = localStorage.getItem("token");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("",{});

    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("name", data.error ?? "Något gick fel");
      return;
    }

    navigate("/posts");
  }
}