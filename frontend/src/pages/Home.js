import { useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

// components
import TasksDetails from "../components/TaskDetails"

const Home = () => {
  const { tasks, dispatch } = useTasksContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/task')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }

    fetchTasks()
  }, [dispatch])

  return (
    <div className="home">
      <div className="tasks">
        {tasks && tasks.map(task => (
          <TasksDetails task={task} key={task._id} />
        ))}
      </div>
    </div>
  )
}

export default Home