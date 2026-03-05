import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PostsPage from './pages/PostsPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav> */}

      <Routes>
        {/* <Route path="/" element={<Navigate />} /> */}
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route element={<ProtectedRoute />}>
        {/* <Route path="/posts/new" element={<CreatePostPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} /> */}
      </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App


