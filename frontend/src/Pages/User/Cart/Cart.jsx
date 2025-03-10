import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./Cart.css";

const Cart = () => {
  const userSkipped = localStorage.getItem("skipped") || "No";
  const userEmail = localStorage.getItem("email"); // Get user email from localStorage
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch cart items from the backend
  useEffect(() => {
    if (userSkipped.toLowerCase() === "no" && userEmail) {
      axios
        .post("http://localhost:5000/fetch-addtocart", { email: userEmail })
        .then((response) => {
          console.log("Cart API Response:", response.data);
          setCartItems(response.data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error.response?.data || error.message);
        });
    }
  }, [userSkipped, userEmail]);

  // Function to remove product from cart
  const removeProduct = (pid) => {
    if (!pid) {
      console.error("Error: Product ID is undefined!", cartItems);
      return;
    }

    axios
      .delete("http://localhost:5000/delcart-products", {
        data: { pid } // Send pid in the request body
      })
      .then((response) => {
        console.log(response.data.message);
        setCartItems((prevItems) => prevItems.filter((item) => item.p_id !== pid)); // Update state safely
      })
      .catch((error) => {
        console.error("Error deleting product:", error.response?.data || error.message);
      });
  };

  // Function to handle "Buy Now" action
  const handleBuyNow = () => {
    if (userEmail) {
      axios
        .delete("http://localhost:5000/clear-cart", {
          data: { email: userEmail } // Send user email to clear their cart
        })
        .then((response) => {
          console.log(response.data.message);
          setCartItems([]); // Clear the cart items in the state
          setOpen(true); // Open the modal
        })
        .catch((error) => {
          console.error("Error clearing cart:", error.response?.data || error.message);
        });
    } else {
      console.error("User email not found!");
    }
  };

  // Logout function
  const goToLoginPage = () => {
    localStorage.removeItem("skipped");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // Modal styling
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  return (
    <div>
      {userSkipped.toLowerCase() === "yes" ? (
        <div className="skipped-cart-page">
          <div className="go-to-login-box">
            <h1>Login to access these features</h1>
            <button onClick={goToLoginPage} className="btn">Go to Login Page</button>
          </div>
        </div>
      ) : (
        <div className="cart-page">
          <h1>Welcome to your Cart</h1>

          {/* Display Cart Items */}
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="empty">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image_url} alt={item.name} className="cart-image" />
                  <h2>{item.name}</h2>
                  <h3>₹{item.price}</h3>
                  <button onClick={() => removeProduct(item.p_id)}>Remove</button>
                </div>
              ))
            )}
          </div>

          {/* Buy Now Button */}
          <Button 
          variant="contained" 
          color="primary" 
          onClick={handleBuyNow} 
          sx={{ backgroundColor: "black", width: "90%",marginLeft:10,height:50 }}>
          Buy Now
          </Button>

          <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="order-confirmation">
            <Box sx={style}>
              <h2>Your Order has been Placed</h2>
              <VerifiedIcon color="success" fontSize="large" />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Cart;