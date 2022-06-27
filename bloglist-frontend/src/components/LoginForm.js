import React from "react"

const LoginForm = ({
  children,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  password,
  username,
}) => {
  return (
    <div>
      <h2>Log in</h2>
      {children}

      <form onSubmit={handleLogin}>
        <div>
          Username <br></br>
          <input
            id={"usernameInput"}
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => handleUsernameChange(target.value)}
          ></input>
          <br></br>
          Password <br></br>
          <input
            id={"passwordInput"}
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => handlePasswordChange(target.value)}
          ></input>
        </div>
        <button type="submit" id={"loginBtn"}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
