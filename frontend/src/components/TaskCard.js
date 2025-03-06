import "../App.css";

function TaskCard(props) {
    return (
      <div className="task-div">
        <h1 className="text-lg font-bold">{props.taskName}</h1>
        <p className="text-sm text-gray-600">Created Date: {props.created_at}</p>
        <p className="text-sm text-gray-600">Task ID: {props.id}</p>
      </div>
    );
  }
  
  export default TaskCard;
  