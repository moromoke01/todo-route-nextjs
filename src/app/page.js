'use client';
import { useEffect, useState } from "react";
import './globals.css';
import { useDispatch, useSelector } from "react-redux";
import { getTodoData, fetchTodos, createTodo, updateTodo, deleteTodo } from "@/lib/features/todos/todoSlice";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Home() {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(getTodoData);

  const [formData, setFormData] = useState({ id: null, title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      if (formData.id !== null) {
        console.log("Updating Todo ID:", formData.id); // Log the ID of the todo being updated
        await dispatch(updateTodo({
          id: formData.id,
          updatedTodo: {
            title: formData.title,
            description: formData.description,
          },
        })).unwrap();
      } else {
        const newTodo = await dispatch(createTodo({
          title: formData.title,
          description: formData.description,
        })).unwrap();
        console.log("New Todo Created with ID:", newTodo.id); // Log the ID of the newly created todo
      }
      setFormData({ id: null, title: '', description: '' });
    } catch (err) {
      console.error('Error handling submit:', err);
    }
  };

  const handleEdit = (todo) => {
    setFormData({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
    } catch (err) {
      console.error('Error handling delete:', err);
    }
  };

  return (
    <div className="min-h-screen m-auto flex flex-col items-center justify-center bg-gray-200">
      <div className="w-full p-5 m-4 bg-purple-800 rounded-lg shadow-md sm:w-3/4 md:w-2/3 lg:w-3/6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white">My Todo List</h1>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Enter todo title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-2 rounded-lg border"
            placeholder="Enter todo description"
            required
          />
          <button type="submit" className="w-full mt-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            {formData.id ? 'Update Todo' : 'Add Todo'}
          </button>
        </form>
      </div>
      <div className="mt-6 p-4 w-full sm:w-3/4 md:w-2/3 lg:w-3/6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Todo Items</h2>
        {status === 'loading' && <p>Loading todos...</p>}
        {status === 'failed' && <p>{error}</p>}
        {status === 'succeeded' && (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-600">{todo.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600" >
                    <RiDeleteBin6Fill />
                  </button>
                  <Link href={`todos/${todo.id}`}>
                    <button
                      className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      View
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
