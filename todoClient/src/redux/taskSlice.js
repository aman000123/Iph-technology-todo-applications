

import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const addToDoReducers = createSlice({

    name: "todo",
    initialState,
    reducers: {
        addTodos: (state, action) => {
            state.push(action.payload)
            return state
        },
        //remove
        removeTodos: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        //update
        upDateTodos: (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload.id) {

                    return {
                        ...todo,
                        item: action.payload.item,
                    }
                }
                return todo
            })
        },
        //completes
        completeTodos: (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: true
                    }

                }
                return todo
            })
        }
    }
})



export const {
    addTodos,
    removeTodos,
    upDateTodos,
    completeTodos
} = addToDoReducers.actions;

export const reducer = addToDoReducers.reducer;