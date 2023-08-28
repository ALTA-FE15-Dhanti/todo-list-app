import React, { useEffect, useState } from 'react';

import TodoCard from '../../components/TodoCard/TodoCard';
import axios from 'axios';

interface Todo {
    id: string;
    content: string;
    description: string;
    is_completed: boolean;
    url: string;
    created_at: string;
  }

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState<string>('');
  const [newTodoDescription, setNewTodoDescription] = useState<string>('');

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = () => {
    axios
      .get<Todo[]>("https://api.todoist.com/rest/v2/tasks?project_id=2318433929", {
        headers: {
          Authorization:
            "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewTask = () => {
    if (!newTodoContent.trim()) {
      return;
    }

    const newTask = {
      content: newTodoContent,
      description: newTodoDescription,
      project_id: 2318433929,
    };

    axios
      .post("https://api.todoist.com/rest/v2/tasks", newTask, {
        headers: {
          Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
        },
      })
      .then((response) => {
        setNewTodoContent('');
        setNewTodoDescription('');
        getTodoList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      <form onSubmit={(e) => { e.preventDefault(); createNewTask(); }} className="mb-4">
        <div className="mb-2">
          <label htmlFor="content" className="block">Task Content:</label>
          <input
            type="text"
            id="content"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block">Task Description:</label>
          <textarea
            id="description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
          Create Task
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos && todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
