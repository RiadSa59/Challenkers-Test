import { useCallback } from 'react';
import { BiPencil, BiX } from 'react-icons/bi';

export default function ModifyTask({ task, setTask, NewStatus, setNewStatus }) {

  const Update = useCallback(async () => {
    if (!NewStatus || NewStatus === 'Changer l\'état') {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: task.name,
          status: NewStatus,
        })
      });

      if (response.ok) {
        setTask((prevTasks) => prevTasks.map(
          (t) => t._id === task._id ? { ...t, status: NewStatus } : t
        ));
        setNewStatus(null);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  }, [NewStatus, task, setTask, setNewStatus]);

  const Delete = useCallback(async () => {
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTask((prevTasks) => prevTasks.filter(
          (t) => t._id !== task._id
        ));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, [task, setTask]);

  return (
    <div className='modify-buttons'>
      <button  onClick={Update}>
        <BiPencil className='bi'/>
      </button>
      <button  onClick={Delete}>
        <BiX className='bi'/>
      </button>
    </div>
  );
}
