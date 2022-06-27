import React, { useState, useEffect, useRef } from "react"

import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import { useDispatch, useSelector } from "react-redux"
import { notificationChange } from "./reducers/notificationReducer"
import { setBlogs, sortBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import BlogList from "./components/BlogList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { initializeUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)

    // Login
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      dispatch(setUser(user))
      setUsername("")
      setPassword("")
      window.location.reload()
    } catch (exception) {
      dispatch(
        notificationChange({
          content: "Wrong username or password",
          visibility: true,
          isError: true,
        })
      )
      setTimeout(() => {
        dispatch(notificationChange({ visibility: false }))
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handlePasswordChange = (password) => {
    setPassword(password)
  }
  const handleUsernameChange = (username) => {
    setUsername(username)
  }
  dispatch(sortBlogs())

  const Home = () => {
    return (
      <div>
        <div>
          <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
            <BlogForm></BlogForm>
          </Togglable>
        </div>

        <BlogList user={user} />
      </div>
    )
  }

  const Users = () => {
    const User = (props) => {
      return <div key={props.user.id}>{props.user.name} </div>
    }
    const users = useSelector((state) => state.users)
    console.log("users from App: ", users)
    return (
      <div>
        <h2>Users</h2>
        <h3>blogs created</h3>
        {users.map((user) => (
          <User key={user.name} user={user} />
        ))}
      </div>
    )
  }

  if (user === null) {
    return (
      <LoginForm
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
        password={password}
        username={username}
      >
        <Notification />
      </LoginForm>
    )
  }

  return (
    <Router>
      <h2>blogs</h2>
      <div>
        <Notification />
      </div>
      <p>
        {user.name} <button onClick={logout}>Logout</button>
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  )
}

export default App
