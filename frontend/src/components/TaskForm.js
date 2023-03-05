import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { Modal, Button } from 'react-bootstrap';
import StateList from './TaskStates';

const TaskForm = () => {
  const { dispatch } = useTasksContext();

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { name, status };

    const response = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName('');
      setStatus('');
      dispatch({ type: 'CREATE_TASKS', payload: json });
      handleClose();
    }
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add a New Task
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Button variant="primary" onClick={handleClose}>
            Cancel{' '}
          </Button>
          <Modal.Title>Ajouter une tâche</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>Tâche  </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Etat </label>
            <StateList onChange={handleStatusChange} />

            <Button variant="primary" type="submit">
              Add Task
            </Button>
            {error && <div className="error">{error}</div>}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskForm;
