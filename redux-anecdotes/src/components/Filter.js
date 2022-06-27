import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"

const Filter = () => {
  const dispatch = useDispatch()

  return <div></div>
}

export default Filter
