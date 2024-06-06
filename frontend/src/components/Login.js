import React, { useState } from 'react';
import axios from 'axios';
import chocolate1 from "../images/ch1.jpg";
import chocolate2 from "../images/ch2.jpg";
import chocolate3 from "../images/ab.jpg";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        passwordPattern: [],
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { username, passwordPattern } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onImageSelect = (image) => {
        setFormData({ ...formData, passwordPattern: [...passwordPattern, image] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            navigate('/home');
            console.log(response.data);
            // Redirect to dashboard or handle successful login
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
            setSuccessMessage('');
        }
    };

    const images = [
        { src: chocolate1, name: 'chocolate1' },
        { src: chocolate2, name: 'chocolate2' },
        { src: chocolate3, name: 'chocolate3' },
    ];

    return (
        <>
         <div>
        <ul className='nav'>
            <li className="nav-item mx-3">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item mx-3">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </ul>
        </div>
        <form onSubmit={onSubmit}>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChange}
                required
            />
            
            <div>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={`chocolate${index + 1}`}
                        onClick={() => onImageSelect(image.name)}
                        style={{ cursor: 'pointer', width: '100px', height: '100px', margin: '10px' }}
                    />
                ))}
            </div>
           
            <button type="submit">Login</button>
          
        </form>
        </>
          
    );
};

