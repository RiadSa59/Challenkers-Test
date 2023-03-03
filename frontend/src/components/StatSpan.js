import PropTypes from "prop-types";
import classNames from "classnames";
import STATES from "./ChangeStat";

const Status = ({ status }) => {
  const statusClassName = classNames("status", {
    todo: status === STATES.TODO,
    "in-progress": status === STATES.IN_PROGRESS,
    done: status === STATES.DONE,
    late: status === STATES.LATE,
  });

  const statusLabel =
    status in STATES ? STATES[status] : <span className="unknown">?</span>;

  return <div className={statusClassName}>{statusLabel}</div>;
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;