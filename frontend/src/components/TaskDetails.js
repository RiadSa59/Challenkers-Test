import { useTasksContext } from '../hooks/useTasksContext'
import  StateList from './TaskStates'


const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()

  const handleClick = async () => {
    const response = await fetch('/api/task/' + task._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TASKS', payload: json})
    }
  }

  const handleStatusChange = async (status) => {
    const response = await fetch(`/api/task/${task._id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_TASKS', payload: json });
    }
  };

  return (
    <tr>
      <td className="task-name">{task.name}</td>
      <td className="task-status">{task.status}</td>
      <td className="task-actions">
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        <StateList onChange={handleStatusChange}/>
      </td>
    </tr>
    
  )
}

export default TaskDetails