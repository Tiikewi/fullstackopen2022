import { createSlice } from "@reduxjs/toolkit"

const initialState = { content: "Notifications here", visibility: false }

const notificationSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
