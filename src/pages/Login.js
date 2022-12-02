import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            localStorage.setItem("isAuth", true)
            localStorage.setItem("user", String(auth.currentUser.displayName))
            setIsAuth(true)
            navigate("/posts")
        })
    }

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Login