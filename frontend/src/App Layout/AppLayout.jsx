import React from 'react';
import {BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom';
import Login from '../Components/Login/Login';
import Add from '../Pages/Admin/Add/Add';
import Dashboard from '../Pages/Admin/Dashboard';
import OrderSummary from '../Pages/Admin/OrderSummary';
import Cart from '../Pages/User/Cart/Cart';
import Explore from '../Pages/User/Explore/Explore';
import Products from '../Pages/User/Products/Products';
import Navbar from '../Components/Navbar/Navbar';
import UserProfile from '../Pages/User/UserProfile/UserProfile';
import AdminProfile from '../Pages/Admin/AdminProfile/AdminProfile';

const AppLayout = () => {
  const rolelc = localStorage.getItem("role") || null;

  return (
    <Router>
      {rolelc && <Navbar />}
      <Routes>
        {/* Redirect unauthenticated users to Login */}
        {!rolelc ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Student Routes */}
            {rolelc === "user" && (
              <>
                <Route path="/Explore" element={<Explore />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/UserProfile" element={<UserProfile/>}/>
              </>
            )}

            {/* Staff Routes */}
            {rolelc === "admin" && (
              <>
                <Route path="/AdminDashboard" element={<Dashboard />} />
                <Route path="/AddProducts" element={<Add />} />
                <Route path="/OrderSummary" element={<OrderSummary />} />
                <Route path='/AdminProfile' element={<AdminProfile/>}/>
              </>
            )}

            {/* Redirect if an unknown route is accessed */}
            <Route path="*" element={<Navigate to={`/Explore`} />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default AppLayout;