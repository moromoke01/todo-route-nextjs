// import { NextResponse } from "next/server";
// import { todos } from "@/app/data/todos";

// let localTodos = [...todos];

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');
//   const todo = localTodos.find(todo => todo.id === parseInt(id, 10));

//   if (!todo) {
//     return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
//   }
//   return NextResponse.json(todo, { status: 200 });
// }

// export async function PUT(req) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');
//   const updatedData = await req.json();
//   const index = localTodos.findIndex(todo => todo.id === parseInt(id, 10));

//   if (index === -1) {
//     return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
//   }

//   localTodos[index] = { ...localTodos[index], ...updatedData };
//   return NextResponse.json(localTodos[index], { status: 200 });
// }

// export async function DELETE(req) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id');
//   const index = localTodos.findIndex(todo => todo.id === parseInt(id, 10));

//   if (index === -1) {
//     return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
//   }

//   localTodos.splice(index, 1);
//   return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
// }
