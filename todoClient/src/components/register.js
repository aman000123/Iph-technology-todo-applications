import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate
import HTTP from '../service/http';
import { EnpPoint } from '../service/endpoint';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Modified request body according to your backend
            await HTTP.Request('POST', `${EnpPoint}/auth/signup`, {
                name,
                email,
                password, // password is required in the backend
                mobile: phone_number // Renamed phone_number to mobile as per backend schema
            });
            navigate('/login');
        } catch (error) {
            toast.error(error.errorMessage)
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='inputForm'>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-5' style={{ width: "100%", borderRadius: "20px", backgroundColor: " rgb(158, 99, 213)" }}>Register</Button>
            <div className='navLinks'>
                <NavLink to='/login' style={{ color: " rgb(158, 99, 213)", marginTop: "10px", }}>Sign In</NavLink>
            </div>
        </Form>
    );
};

export default Register;
