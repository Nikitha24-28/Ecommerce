import React, { useState, useEffect } from "react";
import axios from "axios";
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  const userSkipped = localStorage.getItem("skipped") || "No";
  const userEmail = localStorage.getItem("email");

  const handle_addtocart = async (pid) => {
    if (userSkipped === "yes") {
      alert("Login to access this feature");
      return;
    }

    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/cart-details", {
        pid,
        email: userEmail,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products-data")
      .then((response) => {
        console.log("Fetched Products:", response.data); // Debugging API response
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="productspage">
        <h1 className="productsh1">Products</h1>
        <p className="productsp">"Top Selling products on Minimalist"</p>
      {/* Skin Care Section */}
      <h1 className="title">Skin Care</h1>
      <div className="Skin">
        {products.filter((product) => product.category=== "skin").map((product) => (
            <div key={product.p_id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="productimg"/>
              <h2 className="productname">{product.name}</h2>
              <h3 className="productprice">₹{product.price}</h3>
              <button className="Addtocartbtn"onClick={() => handle_addtocart(product.p_id)}>Add to Cart</button>
            </div>
          ))}
      </div>

      {/* Hair Care Section */}
      <h1 className="title">Hair Care</h1>
      <div className="Hair">
        {products
          .filter((product) => product.category==="hair").map((product) => (
            <div key={product.p_id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="productimg"/>
              <h2 className="productname">{product.name}</h2>
              <h3 className="productprice">₹ {product.price}</h3>
              <button className="Addtocartbtn" onClick={() => handle_addtocart(product.p_id)}>Add to Cart</button>
            </div>
          ))}
      </div>

      {/* Body Care Section */}
      <h1 className="title">Body Care</h1>
      <div className="Body">
        {products
          .filter((product) => product.category === "body")
          .map((product) => (
            <div key={product.p_id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="productimg"/>
              <h2 className="productname">{product.name}</h2>
              <h3 className="productprice">₹{product.price}</h3>
              <button className="Addtocartbtn" onClick={() => handle_addtocart(product.p_id)}>Add to Cart</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;