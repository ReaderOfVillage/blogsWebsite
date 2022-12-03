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
      window.location.pathname = "/";
    })
  }

  return (
    <Router>
      <nav>
        {!isAuth ? (
            <>
              <Link to="/login">Login</Link>  
              <Link to="/">Posts</Link>
            </>
          ) : (
            <>
              <Link to="/">Posts</Link>
              <Link to="/makePost">Create Post</Link>
              <button onClick={signUserOut}>Log Out</button>
            </>
          )}
      </nav>
      <Routes>
        <Route exact path="/makePost" element={<CreatePost isAuth={isAuth} />} />  
        <Route exact path="/" element={<GetPosts isAuth={isAuth} auth={auth} />} />
        <Route exact path="/login" element={<Login setIsAuth={ setIsAuth }  />} />
      </Routes> 
    </Router> 
  );
}

export default App;
