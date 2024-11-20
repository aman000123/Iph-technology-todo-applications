import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Todo from '../components/todos';
import TodoList from '../components/todoList';

const Dashboard = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');

    // If there's no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Todo />
            <TodoList />
        </>
    );
};

export default Dashboard;
