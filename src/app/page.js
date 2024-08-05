'use client';
import { useEffect, useState } from "react";
import './globals.css';
import TodoItem from './Components/TodoItems';
import TodoForm from './Components/TodoForm';
import { useDispatch, useSelector } from "react-redux";
import { getTodoData, fetchTodos, createTodo, updateTodo, deleteTodo } from "@/lib/features/todos/todoSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector(getTodoData);

  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSave = (todo) => {
    console.log("Saving Todo:", todo);
    if (todo.id) {
      dispatch(updateTodo(todo));
    } else {
      dispatch(createTodo(todo));
    }
    setCurrentTodo(null);
  };

  const handleDelete = (id) => {
    console.log("Deleting Todo with ID:", id);
    dispatch(deleteTodo(id));
  };

  if (status === "loading") {
    return <p className="text-center mt-48">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full p-5 m-4 bg-purple-800 rounded-lg shadow-md sm:w-3/4 md:w-2/3 lg:w-3/6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center text-white">My Todo List</h1>
        <TodoForm
          initialData={currentTodo || {}}
          onSave={handleSave}
        />
        <div className="mt-4 bg-white rounded-lg p-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={setCurrentTodo}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
