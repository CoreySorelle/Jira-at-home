import { useState } from "react";
import axios from "axios";
import "../App.css";

function CreateTask({ setContainers, board }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");
      //console.log("Token:", token);

      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

  async function handleClick(event) {
    event.preventDefault(); // Prevent form reload

    const name = document.getElementById("taskName").value;

    if (!name) {
      alert("Please fill in all fields.");
      return;
    }

    // Create task object
    const newTask = {
      name,
      board_id: board.id,
      column: "To Do",
    };

    

    setLoading(true);
    try {
      // Send task to backend
      const response = await axios.post("http://localhost:3001/task/create-task", newTask, {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json", 
          },
      });

      
      const createdTask = response.data.task;

      console.log("New Task Created:", createdTask);

      // Update local state
      setContainers((prevContainers) => ({
        ...prevContainers,
        A: [...prevContainers.A, createdTask], // Add to "To Do" lane (A)
      }));

      // Clear form inputs
      document.getElementById("taskName").value = "";

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form>
      <h2>Create A New Task</h2>
      <label htmlFor="taskName" className="block font-semibold">
        Task Name:
      </label>
      <input type="text" id="taskName"/><br/>


      <button
        onClick={handleClick}
        className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Task"}
      </button><br/>
    </form>
  );
}

export default CreateTask;

  