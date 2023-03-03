import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import  CreateTask from './AddTask';
import  ModifyTask  from './TaskModify';
import  StateList  from './ChangeStat';
import  SearchBar  from './SearchBar';
import Status  from './StatSpan';

const TaskDetails = ({ task }) => {
  const { tasks, setTasks } = useTasksContext();
  const [isNewTask, setIsNewTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('');
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('');

  const handleNewTaskName = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleTaskStatusChange = (task, status) => {
    setSelectedTaskStatus(status);
    ModifyTask({
      task,
      status,
      setTasks,
      setSelectedStatus: setSelectedTaskStatus,
    });
  };

  return (
    <div className="task-list">
      <SearchBar setTasks={setTasks} />
      <table>
        <thead>
          <tr>
            <th colSpan={1}>Task</th>
            <th colSpan={1}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className={isNewTask ? '' : 'hidden'}>
            <td>
              <input
                type="text"
                placeholder="Task name"
                className="input-add"
                onChange={handleNewTaskName}
              />
            </td>
            <td className="status-container">
              <StateList onChange={setNewTaskStatus} />
              <CreateTask
                tasks={tasks}
                setTasks={setTasks}
                name={newTaskName}
                status={newTaskStatus}
                setIsNewTask={setIsNewTask}
              />
            </td>
          </tr>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td className="status-container">
                  <Status status={task.status} />
                  <StateList
                    onChange={(status) =>
                      handleTaskStatusChange(task, status)
                    }
                  />
                  <ModifyTask
                    task={task}
                    selectedStatus={selectedTaskStatus}
                    setTasks={setTasks}
                    setSelectedStatus={setSelectedTaskStatus}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <CreateTask setIsNewTask={setIsNewTask} />
    </div>
  );
};

export default TaskDetails;
