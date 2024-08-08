import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

// Async actions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axiosInstance.get('/todos');
  return response.data;
});

export const fetchTodo = createAsyncThunk('todos/fetchTodo', async (id) => {
  const response = await axiosInstance.get(`/todos/${id}`);
  return response.data;
});

export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo) => {
  const response = await axiosInstance.post('/todos', newTodo);
  return response.data;
});



// export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }) => {
//   const response = await axiosInstance.put(/todos/${id}, updatedTodo);
//   return response.data;
// });


export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }) => {
  try {
    const response = await fetch(`/todos/${id}`, {
      method: 'PUT'
    });

    if (!response.ok) {
      throw new Error('Failed to update the todo');
    }

    return response.data; 
  } catch (error) {
    console.error('Error in updateTodo:', error);
    throw error;
  }
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await fetch(`/todos/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete the todo');
  }
  
  return id; // Return the id for Redux to remove the todo from state
});


// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
//   await axiosInstance.delete(/todos/${id});
//   return id;
// });

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todo: null,
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(updateTodo.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      //   if (index !== -1) {
      //     state.todos[index] = action.payload;
      //   }
      // })

      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // .addCase(deleteTodo.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.todos = state.todos.filter(todo => todo.id !== action.payload);
      // });

      .addCase(deleteTodo.fulfilled, (state, action) => {
        const id = action.payload;
        const index = state.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
          state.todos.splice(index, 1); // Remove todo from state
        }
      });
  },
});

export default todoSlice.reducer;
export const getTodoData = (state) => state.todo;