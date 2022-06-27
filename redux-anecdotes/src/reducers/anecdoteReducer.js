import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const toChange = state.find((a) => a.id === id)
      const votedAnecdote = { ...toChange, votes: toChange.votes + 1 }

      return state.map((a) => (a.id !== id ? a : votedAnecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
