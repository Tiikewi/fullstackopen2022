import React, { useState } from "react"
import { useSelector } from "react-redux"

const blogStyle = {
  width: "50%",
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: "solid grey",
  borderWidth: 1,
  marginBottom: 5,
  marginTop: 5,
  boxShadow:
    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
}

const Blog = ({ blog, likeBlog, remove }) => {
  const user = useSelector((state) => state.user)
  const [fullBlogInfo, setFullBlogInfo] = useState(false)
  const [removeBtnVisible, setRemoveBtnVisible] = useState(false)

  const showWhenOwner = { display: removeBtnVisible ? "" : "none" }

  const toggleViewMode = () => {
    if (user !== undefined) {
      checkUser()
    }
    setFullBlogInfo(!fullBlogInfo)
  }

  const handleLikeBlog = () => {
    likeBlog(blog)
  }

  const checkUser = () => {
    blog.user.username === user.username
      ? setRemoveBtnVisible(true)
      : setRemoveBtnVisible(false)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
    }
  }

  if (!fullBlogInfo) {
    return (
      <div style={blogStyle} id={"blogListSmall"} className={"blog"}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleViewMode} className={"showMoreBtn"}>
          More
        </button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className={"blog"}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleViewMode}>Less</button>
        <br></br>
        {blog.url}
        <br></br>
        Likes: {blog.likes}{" "}
        <button onClick={handleLikeBlog} className={"likeBtn"}>
          Like
        </button>
        <br></br>
        {blog.user.name}
        <div style={showWhenOwner}>
          <br></br>
          <button onClick={handleRemove} className={"removeBtn"}>
            Remove
          </button>
        </div>
      </div>
    )
  }
}

export default Blog
