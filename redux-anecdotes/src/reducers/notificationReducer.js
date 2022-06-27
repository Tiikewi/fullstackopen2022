import { createSlice } from "@reduxjs/toolkit"

const initialState = { content: "Notifications here", visibility: false }

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.content = action.payload
      state.visibility = true
    },
    toggleVisibility(state, action) {
      state.visibility = false
    },
  },
})

export const { setNotification, toggleVisibility } = notificationSlice.actions
export default notificationSlice.reducer
