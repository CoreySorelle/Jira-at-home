
import '../App.css';

const BoardCard = ({board}) => {


    return (
        <div className="App">
          <h1>Board Details</h1>
          <p><strong>Board ID:</strong> {board.id}</p>
          <p><strong>Name:</strong> {board.name}</p>
          <p><strong>Description:</strong> {board.description}</p>
          <p><strong>Created At:</strong> {board.createdDate}</p>
        </div>
      );
  };
  
  export default BoardCard;