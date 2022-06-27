import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { notificationChange } from "../reducers/notificationReducer"

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleBlogCreation = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
    }

    dispatch(createBlog(newBlog))

    const notifactionObject = {
      content: `New blog ${newBlog.title} by ${newBlog.author} added!`,
      isError: false,
      visibility: true,
    }

    dispatch(notificationChange(notifactionObject))
    setTimeout(() => {
      dispatch(notificationChange({ visibility: false }))
    }, 5000)

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={handleBlogCreation}>
      Title:{" "}
      <input
        id={"title"}
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      ></input>
      <br></br>
      Author:{" "}
      <input
        id={"author"}
        type="text"
        name="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      ></input>
      <br></br>
      URL:{" "}
      <input
        id={"url"}
        type="text"
        name="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      ></input>
      <br></br>
      <button type="submit" id={"createBtn"}>
        Create
      </button>
    </form>
  )
}

export default BlogForm
