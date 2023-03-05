import { useEffect } from "react"
import { useTasksContext } from "../hooks/useTasksContext"

// components
import TaskDetails from "../components/TaskDetails"
import TaskForm from "../components/TaskForm"
import  SearchBar  from "../components/SearchTask"
import DeleteAllTasks from "../components/DeleteAllTasks"

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
      <div className='header'><h1>TO-DO LIST</h1></div>
      <SearchBar/>
      <div className="tasks">
        <table>
          <thead>
            <tr>
              <th>Tâche</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map(task => (
              <TaskDetails task={task} key={task._id} />
            ))}
          </tbody>
        </table>
      </div>
      <TaskForm/>
      <DeleteAllTasks/>
      
    </div>
  )
}

export default Home