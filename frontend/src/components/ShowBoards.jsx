import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const ShowBoards = () => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoards = async () => {
      const token = sessionStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/board/boards-by-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }

        const data = await response.json();
        console.log("Boards data:", data);

        if (!data || data.length === 0) {
          setError("No boards found.");
          return;
        }

        setBoards(data); // Set the boards data
      } catch (error) {
        setError("Error fetching board data.");
        console.error(error);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardClick = (board) => {
    navigate("/board", { state: { board } }); // Navigate to board-details page and pass board as state
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (boards.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Your Boards</h1>
      <table>
        <thead>
          <tr>
            <th>Board ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>{board.name}</td>
              <td>{board.description}</td>
              <td>{board.createdDate}</td>
              <td>
                <button onClick={() => handleBoardClick(board)}>View Board</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBoards;
