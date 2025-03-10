import React from 'react';
import "./UserProfile.css";

const UserProfile = () => {
  const userSkipped = localStorage.getItem("skipped") || "No";
  const email=localStorage.getItem("email");

  const Loginpage=()=>{
    localStorage.removeItem("skipped");
    localStorage.removeItem("role");
    window.location.href="/";
  }

  return (
    <div>
      {userSkipped === "yes" ? (
        <div className='skippedprofilepage'>
          <div className="go_to_login_box">
            <h1>Login to access these features</h1>
            <button onClick={Loginpage} className='btn'>Go to Login Page</button>
          </div>
        </div> 
      ) : (
        <div className='adminpfppage'>
          <div className='adminpfp'>
            <img src='https://i.pinimg.com/736x/5d/6e/73/5d6e736930d3e34c99540feaf87dfb92.jpg'/>
            <p className='pfpname'>User</p>
            <p className='pfpmail'>{email}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile