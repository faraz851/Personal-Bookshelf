import React, { useState } from 'react';
import List from '../List/List';

const Board = () => {
  const [lists, setLists] = useState([
    { id: 1, title: 'To Do', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ]);

  const addTask = (targetListId, task) => {
    // Remove the task from the source list
    const newLists = lists.map((list) => {
      if (list.id === targetListId) {
        // Add the task to the target list
        return { ...list, tasks: [...list.tasks, task] };
      } else {
        // Remove the task from the source list if it exists there
        return { ...list, tasks: list.tasks.filter((t) => t.id !== task.id) };
      }
    });

    setLists(newLists);
  };

  const editTask = (listId, taskId, newText) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        );
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    setLists(newLists);
  };

  const deleteTask = (listId, taskId) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    setLists(newLists);
  };

  return (
    <div className="board">
      {lists.map((list) => (
        <List
          key={list.id}
          list={list}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default Board;
