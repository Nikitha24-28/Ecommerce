import React from 'react';
import {useState} from 'react';

const Dashboard = () => {
  const [count, setCount] = useState(0);
  const increase =()=>{
    setCount(count+1);
  }
  const decrease =()=>{
    setCount(count-1);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      {/* <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>Admin Dashboard</h1> */}
      <h1>{count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      
    </div>
  );
};

export default Dashboard;
