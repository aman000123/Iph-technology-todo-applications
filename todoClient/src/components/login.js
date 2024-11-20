import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import HTTP from '../service/http';
import { EnpPoint } from '../service/endpoint';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the login request
            const response = await HTTP.Request('POST', `${EnpPoint}/auth/login`, { email, password });

            if (response?.data?.data?.userInfo?.authToken) {
                const { authToken } = response.data.data.userInfo;
                console.log("token is", authToken);
                // Store token in localStorage
                localStorage.setItem('token', authToken);
                navigate('/dashboard');
            } else {
                alert('Login failed: No token received');
            }
        } catch (error) {
            console.error("Login error: ", error);
            toast.error(error?.errorMessage || "An error occurred during login.");
        }
    };


    return (
        <Form onSubmit={handleSubmit} className='inputForm'>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onFocus={(e) => (e.target.style.outline = '2px solid violet')}
                />
            </Form.Group>
            <Form.Group controlId="formPassword" >
                <Form.Label>Password</Form.Label>
                <Form.Control

                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => (e.target.style.outline = '2px solid violet')}
                    required
                />
            </Form.Group>
            <Button type="submit" className='mt-5' style={{ width: "100%", borderRadius: "20px", backgroundColor: " rgb(158, 99, 213)" }}>Login</Button>
            <div className='navLinks'>
                <NavLink to='/register' style={{ color: " rgb(158, 99, 213)", marginTop: "10px", textAlign: 'center' }} >Sign Up</NavLink>
            </div>
        </Form>
    );
};

export default Login;
