import { useState } from "react";
import axios from "axios";
import "../App.css";
import { API_URL } from "../config";

const CreateBoard = () => {

    const [loading, setLoading] = useState(false);

    

    async function handleClick(event) {
        event.preventDefault(); // Prevent form reload

        const name = document.getElementById("name").value;
        const desc = document.getElementById("desc").value;
        const date = new Date().toISOString(); // Standardized date format
        const token = sessionStorage.getItem("token");

        if (!name) {
        alert("Board must have a name.");
        return;
        }

        // Create board object
        const newBoard = {
        name,
        desc,
        date: date
        };

        console.log("New board Created:", newBoard);

        setLoading(true);
        try {
            // Send task to backend with Authorization header
            await axios.post(
              `${API_URL}/board/`,
              newBoard,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Include token in Authorization header
                  "Content-Type": "application/json" // Optional, but good practice
                }
              }
            );
          
            // Clear form inputs
            document.getElementById("name").value = "";
            document.getElementById("desc").value = "";
          
            alert("Board created successfully!");
          } catch (error) {
            console.error("Error creating board:", error);
            alert("Failed to create board. Please try again.");
          } finally {
        setLoading(false);
        }
    }

    return (
        <>
        <h2>Create a New Board</h2>
        <form>
            <label htmlFor="name" className="block font-semibold">Board Name: </label>
            <input type="text" id="name" className="w-full p-2 border rounded mb-2" /><br/>

            <label htmlFor="desc" className="block font-semibold">Description: </label>
            <input type="text" id="desc" className="w-full p-2 border rounded mb-2" /><br/>

            <button
                onClick={handleClick}
                className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Board"}
            </button><br/>
        </form>
        </>
    );
  };
  
  export default CreateBoard;