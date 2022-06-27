import { createSlice } from "@reduxjs/toolkit"
import usersService from "../services/users"

const usersSlice = createSlice({
  name: "users",
  initialState: [{ name: "No Users" }],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers()
    console.log("USERS FROM REDUCER: ", users)
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
