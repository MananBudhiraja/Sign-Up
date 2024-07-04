import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                setSuccess("Registration successful!");
                setError("");
                console.log(result);
            })
            .catch(err => {
                setError("Registration failed. Please try again.");
                setSuccess("");
                console.log(err);
            });
    }

    return (
        <div className="background-shapes">
            <div className="shape" style={{ top: '10%', left: '10%' }}></div>
            <div className="shape" style={{ top: '30%', left: '70%' }}></div>
            <div className="shape" style={{ top: '70%', left: '20%' }}></div>
            <div className="shape" style={{ top: '50%', left: '50%' }}></div>
            <div className="container">
                <div className="signup-box">
                    <h2>Signup</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email ID"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Create a Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Signup</button>
                        <p>Already have an Account? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
