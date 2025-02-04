function TaskCard(props) {
    return (
      <div className="task-div">
        <h1 className="text-lg font-bold">{props.taskName}</h1>
        <p className="text-sm text-gray-600">Created by: {props.taskAuthor}</p>
        <p className="text-sm text-gray-600">Assigned to: {props.taskAssigned}</p>
      </div>
    );
  }
  
  export default TaskCard;
  