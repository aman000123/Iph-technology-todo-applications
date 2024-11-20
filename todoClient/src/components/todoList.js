

import './style.css'
import { useState } from "react";

import { Button } from "react-bootstrap";
import TodoItem from "./todoItem";
import { removeTodos, upDateTodos, completeTodos } from "../redux/taskSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const TodoList = () => {
    const [sort, setSort] = useState("active")
    const dispatch = useDispatch()
    const todo = useSelector(state => state)

    console.log("display todos", todo)
    const removeTodo = (id) => {
        console.log("remove todos", removeTodos(id))
        dispatch(removeTodos(id))

    }
    const updateTodo = (obj) => {
        dispatch(upDateTodos(obj))
        console.log("Update  todos", dispatch(upDateTodos(obj)))

    }
    const completeTodo = (id) => {
        dispatch(completeTodos(id))
        console.log("complete todos", dispatch(completeTodos(id)))
    }

    return (
        <>
            <div className="btn_contaiers">
                <Button className='active_btn'
                    onClick={() => setSort("active")}>ACTIVE</Button>
                <Button className='completed_btn' onClick={() => setSort("completed")}
                >COMPLETED</Button>
                <Button className='all_btn'
                    onClick={() => setSort("all")}
                >ALL</Button>
            </div>
            <ul>
                {todo.length > 0 && sort === "active"
                    ? todo.map((item) => {
                        return (
                            item.completed === false && (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={removeTodo}
                                    updateTodo={updateTodo}
                                    completeTodo={completeTodo}
                                />
                            )
                        );
                    })
                    : null}
                {/* for all items */}
                {todo.length > 0 && sort === "all"
                    ? todo.map((item) => {
                        return (
                            <TodoItem
                                key={item.id}
                                item={item}
                                removeTodo={removeTodo}
                                updateTodo={updateTodo}
                                completeTodo={completeTodo}
                            />
                        );
                    })
                    : null}
                {todo.length > 0 && sort === "completed"
                    ? todo.map((item) => {
                        return (
                            item.completed === true && (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    removeTodo={removeTodo}
                                    updateTodo={updateTodo}
                                    completeTodo={completeTodo}
                                />
                            )
                        );
                    })
                    : null}
            </ul>
        </>
    )
}
export default TodoList
