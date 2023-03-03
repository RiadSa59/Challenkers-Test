import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';

export default function CreateTask({tasks, setTasks}) {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [isNewTask, setIsNewTask] = useState(false);

  const AddNewTask = async () => {
    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: taskName,
        status: taskStatus
      })
    });

    if(response.ok){
      const data = await response.json();
      setTasks([data, ...tasks]);
    }
  };

  const CreateTaskClick = () => {
    setIsNewTask(true);
  };

  const CancelClick = () => {
    setIsNewTask(false);
  };

  const Submit = (event) => {
    event.preventDefault();
    AddNewTask();
    setIsNewTask(false);
    setTaskName('');
    setTaskStatus('');
  };

  return (
    <>
      {isNewTask ? (
        <form onSubmit={Submit} className="create-task">
          <input type="text" placeholder="Task Name" value={taskName} onChange={(event) => setTaskName(event.target.value)} required />
          <select value={taskStatus} onChange={(event) => setTaskStatus(event.target.value)} required>
            <option value="">Select Status</option>
            <option value="TODO">A faire</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="DONE">Fait</option>
            <option value="LATE">En retard</option>
          </select>
          <button type="submit">Add Task</button>
          <button type="button" onClick={CancelClick}>Cancel</button>
        </form>
      ) : (
        <button className="create-task__button" onClick={CreateTaskClick}>
          <BiPlus/>
          <span>Add Task</span>
        </button>
      )}
    </>
  );
}
