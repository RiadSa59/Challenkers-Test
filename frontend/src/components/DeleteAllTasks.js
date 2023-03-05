import { useTasksContext } from "../hooks/useTasksContext";

const DeleteAllTasks = () => {
  const { dispatch } = useTasksContext();

  const handleDeleteAll = async () => {
    try {
      const response = await fetch("/api/task", {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_ALL", payload: [] });
        console.log(json.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-all-tasks">
      <button onClick={handleDeleteAll}>Delete All Tasks</button>
    </div>
  );
};

export default DeleteAllTasks;
