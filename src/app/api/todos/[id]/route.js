// import { todos } from '@/app/data/todos';
import { NextResponse } from 'next/server';
import { todos as localTodos } from '@/app/data/todos';


// let localTodos = [...todos];



// Handle GET request for a single todo item
export async function GET(req) {
  
  try {
    const url = new URL(req.url);
    const todoId = url.pathname.split('/').pop();
    const todo = localTodos.find(t => t.id === parseInt(todoId, 10));
   
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}




// Handle UPDATE request to create a new todo item
export async function PUT(req) {
  try {
    const data = await req.json();

    const url = new URL(req.url);
    const todoId = url.pathname.split('/').pop();

    // Ensure that the todoId is correctly extracted
    if (!todoId) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const index = localTodos.findIndex(todo => todo.id === parseInt(todoId, 10));

    if (index === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    // Update the todo item in localTodos
    localTodos[index] = { ...localTodos[index], ...data };

    return NextResponse.json(localTodos[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}









// Handle DELETE request to remove a todo item
 export async function DELETE(req, { params }) {
  const { id } = params;

  // Find the index of the todo item to delete
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return new Response('Todo not found', { status: 404 });
  }

  // Remove the todo item
  todos.splice(index, 1);

  return new Response('Todo deleted successfully', { status: 200 });
}