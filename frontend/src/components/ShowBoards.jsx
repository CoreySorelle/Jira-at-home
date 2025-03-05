import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const ShowBoards = () => {
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (boards.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1 className="text-2xl font-semibold mb-4">Your Boards</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Board ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{board.id}</td>
              <td className="border px-4 py-2">{board.name}</td>
              <td className="border px-4 py-2">{board.description}</td>
              <td className="border px-4 py-2">{board.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowBoards;
