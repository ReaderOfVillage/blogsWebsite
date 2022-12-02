import './App.css';
import React, { useState } from 'react'
import CreatePost from './pages/CreatePost'
import GetPosts from './pages/GetPosts'
import Login from './pages/Login'
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <nav>
        {!isAuth ? (
            <>
              <Link to="/login">Login</Link>  
              <Link to="/posts">Read Posts</Link>
            </>
          ) : (
            <>
              <Link to="/posts">Read Posts</Link>
              <Link to="/makePost">Create Post</Link>
              <button onClick={signUserOut}>Log Out</button>
            </>
          )}
      </nav>
      <Routes>
        <Route path="/makePost" element={<CreatePost isAuth={isAuth} />} />  
        <Route path="/posts" element={<GetPosts isAuth={isAuth} auth={auth} />} />
        <Route path="/login" element={<Login setIsAuth={ setIsAuth } />} />
      </Routes> 
    </Router> 
  );
}

export default App;
