import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const msg = notification.content

  let msgStyle = {
    color: "green",
    background: "rgb(236, 255, 216)",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  }
  const fontStyle = {
    color: "red",
  }

  if (notification.visibility === false) {
    return null
  }
  if (notification.isError === true) {
    msgStyle = {
      ...msgStyle,
      color: "red",
      background: "rgb(255, 249, 242)",
    }
    return (
      <div style={msgStyle}>
        <p style={fontStyle} id={"errorMsg"}>
          {msg}
        </p>
      </div>
    )
  }

  return <div style={msgStyle}>{msg}</div>
}

export default Notification
