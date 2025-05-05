import axios from "axios";
import { API_URL } from "../config";

export async function FetchTasks(boardId) {
  try {
    const response = await axios.get(`${API_URL}/task/get-tasks`, {
        params: { boardId: boardId}, 
      });
    
      const tasks = response.data.tasks;

    console.log(tasks);

    // Sorting tasks into containers based on status
    const containers = {
      A: tasks.filter((task) => task.status === "To Do"),
      B: tasks.filter((task) => task.status === "In Progress"),
      C: tasks.filter((task) => task.status === "In Testing"),
      D: tasks.filter((task) => task.status === "Completed"),
    };

    console.log("Fetched Tasks:", containers);
    return containers;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      A: [],
      B: [],
      C: [],
      D: [],
    };
  }
}