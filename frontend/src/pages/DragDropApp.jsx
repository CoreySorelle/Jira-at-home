import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import "../App.css";

const ItemType = {
  ITEM: "ITEM",
};

// Draggable Item Component
const DraggableItem = ({ id, text, taskName, taskAuthor, taskAssigned }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ITEM,
    item: { id, text, taskName, taskAuthor, taskAssigned },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="p-4 bg-blue-500 text-white rounded-lg cursor-grab shadow-md"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <TaskCard taskName={taskName} taskAuthor={taskAuthor} taskAssigned={taskAssigned} />
    </div>
  );
};

// Droppable Area Component
const DroppableArea = ({ id, title, items, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemType.ITEM,
      drop: (item) => onDrop(item.id, id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));
  
    return (
      <div className="drop-area">
        {/* Lane Title */}
        <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
  
        {/* Droppable Area */}
        <div
          ref={drop}
          className={`p-6 border-2 border-dashed rounded-lg min-h-[200px] shadow-md ${
            isOver ? "bg-green-200" : "bg-gray-200"
          }`}
        >
          {/* Show task cards if there are items, otherwise show a placeholder */}
          {items.length > 0 ? (
            items.map((item) => (
              <DraggableItem
                key={item.id} // ✅ Add key prop
                id={item.id}
                taskName={item.name} 
                taskAuthor={item.createdBy} 
                taskAssigned={item.assignedTo} 
              />
            ))
          ) : (
            <div className="task-div">
              Drag tasks here
            </div>
          )}
        </div>
      </div>
      
    );
  };
  

// Main App Component
const DragDropApp = () => {
  const [containers, setContainers] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
  });

  const handleDrop = (itemId, targetId) => {
    setContainers((prevContainers) => {
      let movedItem = null;
      const newContainers = { ...prevContainers };
  
      // Check if the item is already in the target container (prevents unnecessary state updates)
      if (newContainers[targetId].some((item) => item.id === itemId)) {
        console.warn(`Item ${itemId} is already in ${targetId}. Skipping redundant drop.`);
        return prevContainers;  // No state update needed
      }
  
      // Remove item from its previous container
      Object.keys(newContainers).forEach((key) => {
        newContainers[key] = newContainers[key].filter((item) => {
          if (item.id === itemId) {
            movedItem = item;
            return false; // Remove from old container
          }
          return true;
        });
      });
  
      // Add to new container
      if (movedItem) {
        newContainers[targetId].push(movedItem);
        //console.log(`Moved item: ${movedItem.id} to ${targetId}`);
      } else {
        console.warn(`Item ${itemId} not found in any container.`);
      }
  
      //console.log("Updated Containers:", newContainers);
      return newContainers;
    });
  };
  
  

  return (
    <>
    <div>
      <CreateTask setContainers={setContainers} />
    </div>
    

    <DndProvider backend={HTML5Backend}>
      <div className="grid-container">
        <DroppableArea id="A" title="To Do" items={containers.A} onDrop={handleDrop} />
        <DroppableArea id="B" title="In Progress" items={containers.B} onDrop={handleDrop} />
        <DroppableArea id="C" title="Testing" items={containers.C} onDrop={handleDrop} />
        <DroppableArea id="D" title="Done" items={containers.D} onDrop={handleDrop} />
      </div>
    </DndProvider>
    </>
  );
};

export default DragDropApp;
