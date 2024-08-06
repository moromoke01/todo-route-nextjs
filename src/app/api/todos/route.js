import { todos } from '@/app/data/todos';
import { NextResponse } from 'next/server';

let localTodos = [...todos];

// Handle GET request for all todo items
export async function GET(req) {
  return NextResponse.json(localTodos, { status: 200 });
}



// Handle POST request to create a new todo item
export async function POST(req) {
  try {
    const data = await req.json();
    const newTodo = {
      id: Date.now(), 
      ...data,
    };
    localTodos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


// Handle PUT request to update an existing todo item
export async function PATCH(req) {
  const data = await req.json();
  const url = new URL(req.url);
  const todoId = url.pathname.split('/').pop();
  const index = localTodos.findIndex(todo => todo.id === parseInt(todoId, 10));

  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  localTodos[index] = { ...localTodos[index], ...data };
  return NextResponse.json(localTodos[index], { status: 200 });
}

// Handle DELETE request to remove a todo item
export async function DELETE(req) {
  const url = new URL(req.url);
  const todoId = url.pathname.split('/').pop();
  const index = localTodos.findIndex(todo => todo.id === parseInt(todoId, 10));

  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  localTodos.splice(index, 1);
  return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
}