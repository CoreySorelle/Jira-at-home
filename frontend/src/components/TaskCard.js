import "../App.css";

function TaskCard(props) {
    return (
      <div className="task-div">
        <h1>{props.taskName}</h1>
        <p>Created By: {props.username}</p>
        <p>Created Date: {props.created_at}</p>
        <p>Task ID: {props.id}</p>
      </div>
    );
  }
  
  export default TaskCard;
  