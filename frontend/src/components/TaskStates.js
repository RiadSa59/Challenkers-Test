import { useState } from "react";

 const STATES = {
    TODO : " A faire",
    IN_PROGRESS : "En cours",
    DONE : "Fait",
    LATE : "En retard"
}
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
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateList
