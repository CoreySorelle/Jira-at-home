import { useState } from "react";
import axios from "axios";
import "../App.css";

function CreateTask({ setContainers }) {
  const [loading, setLoading] = useState(false);

  async function handleClick(event) {
    event.preventDefault(); // Prevent form reload

    const name = document.getElementById("taskName").value;
    const author = document.getElementById("taskAuthor").value;
    const assignee = document.getElementById("taskAssigned").value;
    const date = new Date().toISOString(); // Standardized date format

    if (!name || !author || !assignee) {
      alert("Please fill in all fields.");
      return;
    }

    // Create task object
    const newTask = {
      id: Date.now().toString(), // Unique ID
      name,
      date: date,
      createdBy: author,
      assignedTo: assignee,
      column: "To Do",
    };

    setLoading(true);
    try {
      // Send task to backend
      await axios.post("http://localhost:3001/task/create-task", newTask);

      // Update local state
      setContainers((prevContainers) => ({
        ...prevContainers,
        A: [...prevContainers.A, newTask], // Add to "To Do" lane (A)
      }));

      // Clear form inputs
      document.getElementById("taskName").value = "";
      document.getElementById("taskAuthor").value = "";
      document.getElementById("taskAssigned").value = "";

      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form>
      <label htmlFor="taskName" className="block font-semibold">
        Task Name:
      </label>
      <input type="text" id="taskName" className="w-full p-2 border rounded mb-2" /><br/>

      <label htmlFor="taskAuthor" className="block font-semibold">
        Created By:
      </label>
      <input type="text" id="taskAuthor" className="w-full p-2 border rounded mb-2" /><br/>

      <label htmlFor="taskAssigned" className="block font-semibold">
        Assigned To:
      </label>
      <input type="text" id="taskAssigned" className="w-full p-2 border rounded mb-2" /><br/>

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

  