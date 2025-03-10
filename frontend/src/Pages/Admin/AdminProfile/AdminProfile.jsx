import React from 'react';
import "./AdminProfile.css";

const AdminProfile = () => {
  return (
    <div className='adminpfppage'>
      <div className='adminpfp'>
        <img src='https://i.pinimg.com/736x/5d/6e/73/5d6e736930d3e34c99540feaf87dfb92.jpg'/>
        <p className='pfpname'>Admin</p>
        <p className='pfpmail'>Admin@gmail.com</p>
      </div>
    </div>
  )
}

export default AdminProfile