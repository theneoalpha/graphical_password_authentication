import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";


export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any stored authentication tokens or user data
        localStorage.removeItem('authToken'); // Example if you're using local storage
        // Redirect to the register page
        navigate('/register');
    };

    return (
        <>
            <div  className="dashboard">
                <h1> Welcome to Graphical Password Authentication Home Page</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </>
    );
}
