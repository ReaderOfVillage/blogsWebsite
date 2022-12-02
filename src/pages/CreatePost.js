import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom'

function CreatePost({ isAuth }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const publishBlog = () => {
    Axios.post('https://blogs-website-backend.herokuapp.com/makePost', { title: title, description: description, user: String(auth.currentUser.displayName), date: new Date })
      .then(() => {
        navigate('/posts')
      })
      .catch((err) => {
        alert(err)
      })
  }

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [])

  return (
    <div className="App">
      <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}} />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea placeholder="Post..." onChange={(e) => {setDescription(e.target.value)}} />
        </div>
        <button className='publishBtn' onClick={publishBlog}> Publish Blog </button>
      </div>
    </div>
    </div>
  )
}

export default CreatePost