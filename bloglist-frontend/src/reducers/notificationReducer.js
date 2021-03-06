const initialState = {
  content: "Notifications here",
  visibility: false,
  isError: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification
    default:
      return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification,
  }
}

export default notificationReducer
