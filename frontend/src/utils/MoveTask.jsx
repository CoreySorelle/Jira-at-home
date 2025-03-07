import axios from "axios";

export async function MoveTask(taskId, target) {
    
    

    if(target === 'A'){
        target = 'To Do';
    } else if (target === 'B'){
        target = 'In Progress';
    } else if (target === 'C'){
        target = 'In Testing';
    } else if (target === 'D'){
        target = 'Completed';
    }

    console.log(taskId + " " + target);
  
    try {
        const response = await axios.patch(`http://localhost:3001/task/update-task`, {
            taskId: taskId,  // Send data in the body
            target: target   // Send data in the body
        });
    
  } catch (error) {
    console.error("Error Updating Task Column:", error);
  }
}