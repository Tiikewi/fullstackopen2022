import AncecdoteForm from "./components/AncedoteForm"
import AncecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AncecdoteList />
      <div>
        <AncecdoteForm />
      </div>
    </div>
  )
}

export default App
