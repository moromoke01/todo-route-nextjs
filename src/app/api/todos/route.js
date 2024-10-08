// import { todos } from '@/app/data/todos';
import { NextResponse } from 'next/server';
import { todos as localTodos } from '@/app/data/todos';
// let localTodos = [...todos];

// Handle GET request for all todo items
export async function GET() {
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



// export async function PUT(req) {
//   try {
//     const data = await req.json();

//     const url = new URL(req.url);
//     const todoId = url.pathname.split('/').pop();

//     // Ensure that the todoId is correctly extracted
//     if (!todoId) {
//       return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
//     }

//     const index = localTodos.findIndex(todo => todo.id === parseInt(todoId, 10));

//     if (index === -1) {
//       return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
//     }

//     // Update the todo item in localTodos
//     localTodos[index] = { ...localTodos[index], ...data };

//     return NextResponse.json(localTodos[index], { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
//   }
// }






// Handle DELETE request to remove a todo item
// export async function DELETE(req) {
//   try {
//     const url = new URL(req.url);
//     const todoId = url.pathname.split('/').pop();
//     const index = localTodos.findIndex(u => u.id === parseInt(todoId, 10));

//     if (index === -1) {
//       return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
//     }

//     localTodos.splice(index, 1);
//     return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
//   } catch (error) {
//     console.error("Error in DELETE:", error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
