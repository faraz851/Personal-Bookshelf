import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, onEditTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditTask(task.id, editedText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div
      className="task"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        margin: '4px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        position: 'relative',
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>{task.text}</p>
          <div className="task-buttons">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
