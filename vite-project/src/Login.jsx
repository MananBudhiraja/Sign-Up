import './Login.css'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("Please fill in all fields");
        return;
    }


    axios.post('http://localhost:3001/login', { email, password })
        .then(result => {
            setError("");
            console.log(result);
            if(result.data=="Success"){
              setSuccess("Authenticated successful!");
            }
            else{
              setError("Incorrect Password or user!");
            }
        })
        .catch(err => {
            setError("Login failed. Please try again.");
            setSuccess("");
            console.log(err);
        });
}



  return (
    <div>
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
                                placeholder="Enter your Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">LogIn</button>
                        <p>Do not have an Account? <Link to="/Signup">Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login