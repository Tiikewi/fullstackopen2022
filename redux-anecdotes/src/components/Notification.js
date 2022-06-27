import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { store } from "../store"
import { toggleVisibility } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  const dispatch = useDispatch()

  store.subscribe(() => {
    setTimeout(() => {
      dispatch(toggleVisibility())
    }, 5000)
  })

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }
  if (notification.visibility) {
    return <div style={style}>{notification.content}</div>
  } else return <div></div>
}

export default Notification
