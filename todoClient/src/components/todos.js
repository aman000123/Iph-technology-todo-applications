

import './style.css'
import { useSelector } from "react-redux";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addTodos } from "../redux/taskSlice";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const Todo = () => {
    const [todo, setTodo] = useState("");
    const dispatch = useDispatch()
    const addTodo = (todo) => dispatch(addTodos(todo))

    const navigate = useNavigate()

    const handleChange = (e) => {
        setTodo(e.target.value)
        //console.log(e.target.value)
    };


    const add = () => {
        if (todo === "") {
            alert("Please enter your todolist's");
        } else {
            addTodo({
                id: Math.floor(Math.random() * 1000),
                item: todo,
                completed: false,
            });

            setTodo("");
        }

    };
    //show add todos contents using selectors
    const todos = useSelector(state => state)



    const handelLogOut = () => {
        // alert("Are you want to logout")
        localStorage.removeItem("token")
        navigate('/login');
    }

    return (
        <>
            <div className='main'>
                <div className='headers'><h1 className="h3"> TODO APPLICATION</h1>
                    <Button className='btnss' style={{ padding: "8px 25px" }}
                        onClick={handelLogOut}
                    >Logout</Button>
                </div>

                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Col sm={7}>
                                <Form.Control type="text" placeholder="Enter Your todos task here's"
                                    onChange={(e) => handleChange(e)}

                                    value={todo}
                                />
                            </Col>
                            <Button className='btnss'
                                onClick={() => add()}
                            >ADD ITEMS</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default Todo