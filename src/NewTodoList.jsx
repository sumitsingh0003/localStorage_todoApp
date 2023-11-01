import React, { useState, useEffect } from 'react';

const NewTodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingTask !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = task;
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Add new task
      if (task.trim() !== '') {
        setTasks([...tasks, task]);
      }
    }
    setTask('');
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditingTask(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleInputChange} />
        <button type="submit">{editingTask !== null ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewTodoList;