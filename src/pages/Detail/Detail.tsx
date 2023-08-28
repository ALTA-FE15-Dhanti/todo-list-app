import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import moment from 'moment';

interface Todo {
  id: string;
  content: string;
  description: string;
  is_completed: boolean;
  url: string;
  created_at: string;
}

const Detail: React.FC = () => {
  const { index } = useParams();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios
      .get<Todo>(`https://api.todoist.com/rest/v2/tasks/${index}`, {
        headers: {
          Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
        },
      })
      .then((response) => {
        setTodo(response.data);
        setEditedContent(response.data.content);
        setEditedDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [index]);

  const formattedDate = todo ? moment(todo.created_at).format('MMMM D, YYYY') : '';

  const handleEdit = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${index}`,
        {
          content: editedContent,
          description: editedDescription,
        },
        {
          headers: {
            Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
          },
        }
      )
      .then(() => {
        setTodo((prevTodo) => ({
          ...prevTodo!,
          content: editedContent,
          description: editedDescription,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseTask = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${index}/close`,
        {},
        {
          headers: {
            Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
          },
        }
      )
      .then(() => {
        setTodo((prevTodo) => ({
          ...prevTodo!,
          is_completed: true,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReopenTask = () => {
    axios
      .post(
        `https://api.todoist.com/rest/v2/tasks/${index}/reopen`,
        {},
        {
          headers: {
            Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
          },
        }
      )
      .then(() => {
        setTodo((prevTodo) => ({
          ...prevTodo!,
          is_completed: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTask = () => {
    axios
      .delete(`https://api.todoist.com/rest/v2/tasks/${index}`, {
        headers: {
          Authorization: "Bearer 84fb3365d7d80d5540819f25270d4541df2c7440",
        },
      })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-white  shadow-md p-6 m-5 mx-auto">
      {todo ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Content:</label>
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">Description:</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full h-32 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <span className={`text-lg font-semibold ${!todo.is_completed ? 'text-green-600' : 'text-red-600'} mr-2`}>
              {!todo.is_completed ? 'Active' : 'Close'}
            </span>
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>
          <a
            href={todo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mb-4 text-sm"
          >
            View Details
          </a>
          <div className="flex justify-between items-center mb-4">
            <div>
              {todo.is_completed ? (
                <button onClick={handleReopenTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Reopen Task
                </button>
              ) : (
                <button onClick={handleCloseTask} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Close Task
                </button>
              )}
              <button onClick={handleEdit} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-4 hover:bg-gray-400">
                Edit
              </button>
              <button onClick={handleDeleteTask} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-red-600">
                Delete Task
              </button>
            </div>
            <Link to="/" className="text-blue-500 hover:underline text-sm">
              Back to Todo List
            </Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
