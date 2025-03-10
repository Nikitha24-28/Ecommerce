import React from 'react';
import {useState} from 'react';
import axios from'axios';
import './Login.css'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("All fields are required");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/login", {
            email,
            password
        });

        if (response.status === 200 && response.data.role) {
          console.log(response.data.role);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email",email);
            window.location.href = (response.data.role==="user"? '/Explore':'/AdminDashboard');
        } else {
            setError("Invalid credentials. Please try again.");
            console.log(error);
        }
    } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        console.log(error);
    }
  };

  const handleskip = () => {
    localStorage.setItem("role", "user");
    localStorage.setItem("skipped","yes");
    window.location.href = "/Explore";
  };
  
  return (
    <div className='loginpage'>
      <div className='Loginbox'>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
            <input className="inputbox one" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="inputbox two" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br></br>
            <button className="signin" type="submit">Sign in</button>
            <br></br>
            <br></br>
            <a className="skiplink" onClick={handleskip}>Skip for now</a>
        </form>
      </div>
    </div>
  )
}

export default Login;