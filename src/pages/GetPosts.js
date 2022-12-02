import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function GetPosts({ isAuth }) {
  const [listOfBlogs, setListOfBlogs] = useState([])
  const user = localStorage.getItem("user")

  useEffect(() => {
    Axios.get("https://blogs-website-backend.herokuapp.com/read")
      .then((response) => {
        setListOfBlogs(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [listOfBlogs])

  const deletePost = (id) => {
    Axios.delete(`https://blogs-website-backend.herokuapp.com/delete/${id}`)
  }

  const updatePost = (id) => {
    const newPost = prompt("Enter the new post: ")

    Axios.put("https://blogs-website-backend.herokuapp.com/update", { newPost: newPost, id: id }).then(() => {
      setListOfBlogs(listOfBlogs.map((val) => {
        return val._id == id ? {_id: id, title: val.title, description: newPost} : val
      }))
    })
  }

  return (
    <div className="homePage">
        {listOfBlogs.map((val) => {
          return <div className="post">
            <div className='postContainer'>
              <div className="postHeader">
                <div>
                  <h1 className="title">{val.title}</h1>
                </div>
                <div className="deletePost">
                  { isAuth && val.user === user && (<button onClick={() => {deletePost(val._id)}}> &#128465; </button>)}
                </div>
                <div className="updatePost">
                  { isAuth && val.user === user && (<button onClick={() => {updatePost(val._id)}}> Edit </button>)}
                </div>
              </div>
              <div className="postTextContainer"> {val.description} </div>
              <h3>@{val.user}</h3>
              <h5>{val.date}</h5>
          </div>
        </div>
          })}
    </div>
  )
}

export default GetPosts