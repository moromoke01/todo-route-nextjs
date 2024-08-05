import { todos } from '@/app/data/todos';
import { NextResponse } from 'next/server';

let localTodos = [...todos];

// Handle GET request for all todo items
export async function GET(req) {
  return NextResponse.json(localTodos, { status: 200 });
}

// Handle GET request for a single todo item
export async function GET_BY_ID(req) {
  const url = new URL(req.url);
  const todoId = url.pathname.split('/').pop();
  const todo = localTodos.find(todo => todo.id === parseInt(todoId, 10));

  if (!todo) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo, { status: 200 });
}

// Handle POST request to create a new todo item
export async function POST(req) {
  const data = await req.json();
  const newTodo = {
    id: Date.now(),
    ...data,
  };
  localTodos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// Handle PUT request to update an existing todo item
export async function PUT(req) {
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
