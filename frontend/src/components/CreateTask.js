import "../App.css";

function CreateTask({ setContainers }) {
    function handleClick(event) {
      event.preventDefault(); // Prevent form from reloading page
  
      const name = document.getElementById("taskName").value;
      const author = document.getElementById("taskAuthor").value;
      const assignee = document.getElementById("taskAssigned").value;
  
      if (!name || !author || !assignee) {
        alert("Please fill in all fields.");
        return;
      }
  
      setContainers((prevContainers) => {
        const newId = Object.values(prevContainers).flat().length + 1; // Generate unique ID
        const newTask = {
          id: newId,
          taskName: name,
          taskAuthor: author,
          taskAssigned: assignee,
        };
  
        return {
          ...prevContainers,
          A: [...prevContainers.A, newTask], // Add new task to "To Do" lane (A)
        };
      });
  
      // Clear form inputs
      document.getElementById("taskName").value = "";
      document.getElementById("taskAuthor").value = "";
      document.getElementById("taskAssigned").value = "";
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
        >
          Create Task
        </button><br/>
      </form>
    );
  }
  
  export default CreateTask;
  