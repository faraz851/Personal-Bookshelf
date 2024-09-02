// src/components/List.js
import React, { useState } from 'react';
import Task from '../Task/Task';
import { useDrop } from 'react-dnd';

const List = ({ list, addTask, editTask, deleteTask }) => {
  const [taskText, setTaskText] = useState('');

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => addTask(list.id, item.task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(list.id, { id: Date.now(), text: taskText });
      setTaskText('');
    }
  };

  return (
    <div className="list" ref={drop} style={{ backgroundColor: isOver ? '#e0e0e0' : 'white' }}>
      <h3>{list.title}</h3>
      {list.tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEditTask={(taskId, newText) => editTask(list.id, taskId, newText)}
          onDeleteTask={(taskId) => deleteTask(list.id, taskId)}
        />
      ))}
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="New Task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default List;
