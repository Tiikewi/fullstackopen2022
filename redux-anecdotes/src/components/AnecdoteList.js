import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AncecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted ${anecdote}`))
  }
  const anecdotes = useSelector((state) => state.anecdotes)

  const sorted = anecdotes.slice().sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    <div>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AncecdoteList
