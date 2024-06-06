import React, { useState } from 'react';
import axios from 'axios';
import chocolate1 from "../images/ch1.jpg";
import chocolate2 from "../images/ch2.jpg";
import chocolate3 from "../images/ch3.jpg";
import chocolate4 from "../images/ch4.jpg";
import chocolate5 from "../images/ch5.jpg";
import chocolate6 from "../images/ch6.jpg";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passwordPattern: [],
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const { username, email, passwordPattern } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onImageSelect = (image) => {
        setFormData({ ...formData, passwordPattern: [...passwordPattern, image] });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            setErrorMessage('Please complete the reCAPTCHA.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { ...formData, recaptchaToken });
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            navigate('/login');
            console.log(response.data);
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
        { src: chocolate4, name: 'chocolate4' },
        { src: chocolate5, name: 'chocolate5' },
        { src: chocolate6, name: 'chocolate6' }
    ];

    return (
        <>
            <div>
                <ul className='nav button'>
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
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <div className='text'> Password Sequence
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
                </div>
                <ReCAPTCHA
                    sitekey="6Ld9RvIpAAAAAGTOkNq2Aofr9VjrjDFso9V1H-sY" // Replace with your reCAPTCHA site key
                    onChange={setRecaptchaToken}
                />
                <button type="submit">Register</button>
            </form>
        </>
    );
};
