import React from 'react';
import "./dashboard.css";
import bg from "../images/bg.jpg";
import { Link } from "react-router-dom";


const Dashboard = () => {
    return (
        <>
        
        <div styles={{ backgroundImage:`url(${bg})` }} className="dashboard">
            <h1>Graphical Password Authentication</h1>
            
            <Link className="btn" to="/register">Try Now</Link>
            
        </div>
        </>
    );
};

export default Dashboard;
