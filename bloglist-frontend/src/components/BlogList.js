import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Blog from "./Blog"
import {
  handleVote,
  removeBlog,
  sortBlogs,
  initializeBlogs,
} from "../reducers/blogReducer"

import blogService from "../services/blogs"

import { useEffect } from "react"

const BlogList = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

  const likeBlog = async (blogObject) => {
    const id = blogObject.id
    const newBlog = {
      user: blogObject.user,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url,
    }

    await blogService.edit(newBlog, id)

    dispatch(handleVote(id))
    dispatch(sortBlogs())
  }

  const handleRemoveBlog = async (id) => {
    await blogService.remove(id)

    // remove from blogs so view updates
    dispatch(removeBlog(id))
  }

  dispatch(sortBlogs())

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          user={props.user}
          remove={handleRemoveBlog}
        />
      ))}
    </div>
  )
}

export default BlogList
