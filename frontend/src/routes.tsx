// src/routes.tsx
import { Navigate } from "react-router";

const routes = [
  { index: true, element: <Navigate to="/posts" replace /> },
  { path: "/posts", element: <PostsPage> },
  { path: "/signin", element: <SignInPage> },
  { path: "/signup", element: <SignUpPage> },
];

export default routes;