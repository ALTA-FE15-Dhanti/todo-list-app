import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

interface Todo {
  id: string;
  content: string;
  description: string;
  is_completed: boolean;
  url: string;
  created_at: string;
}

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {

  const formattedDate = moment(todo.created_at).format('MMMM D, YYYY');
  const textColorCompletion = !todo.is_completed ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-black font-semibold mb-2">{todo.content}</h3>
      <p className="text-gray-600">{todo.description}</p>
      <div className="mt-2 flex items-center">
        <span className={`${textColorCompletion} font-semibold mr-2`}>
          {!todo.is_completed ? 'Active' : 'Close'}
        </span>
        <span className="text-gray-500">{formattedDate}</span>
      </div>
      <Link to={`/Detail/${todo.id}`} className="text-blue-500 hover:underline mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default TodoCard;
