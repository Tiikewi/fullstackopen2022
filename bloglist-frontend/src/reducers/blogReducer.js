import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"
import blogService from "../services/blogs"

const blogSlice = createSlice({
  name: blogs,
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    handleVote(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }

      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    },
    sortBlogs(state) {
      const sorted = state.sort((a, b) => {
        return b.likes - a.likes
      })
      return sorted
    },
  },
})

export const { appendBlog, setBlogs, handleVote, removeBlog, sortBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    const newBlog = { ...response, user: blog.user }

    dispatch(appendBlog(newBlog))
  }
}

export default blogSlice.reducer
