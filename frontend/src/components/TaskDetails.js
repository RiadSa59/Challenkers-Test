import { useTasksContext } from '../hooks/useTasksContext'
import  StateList from './TaskStates'
import { STATES } from "./TasksOptions";



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
  
  const findIdByValue = (value) => {
    const state = Object.values(STATES).find((s) => s.value === value);
    return state ? state.id : "";
  };
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
  const statusId = findIdByValue(task.status)
  return (
    <tr>
      <td className="task-name">{task.name}</td>
      <td className="status-name" id={statusId}>{task.status}</td>
      <td className="task-actions">
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        <StateList onChange={handleStatusChange}/>
      </td>
    </tr>
    
  )
}

export default TaskDetails