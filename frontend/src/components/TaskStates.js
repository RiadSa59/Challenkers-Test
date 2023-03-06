import { useState } from "react";
import { STATES } from "./TasksOptions";

const StateList = ({ onChange }) => {
  const [selectedStatus, setNewStatus] = useState("");

  const NewStatus = (event) => {
    const selectedStatus = event.target.value;
    setNewStatus(selectedStatus);
    onChange(selectedStatus);
  };

  return (
    <div className="state-options">
      <select value={selectedStatus} onChange={NewStatus}>
        <option value="">Changes State</option>
        {Object.values(STATES).map((state) => (
          <option key={state.id} value={state.value}>
            {state.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateList;
