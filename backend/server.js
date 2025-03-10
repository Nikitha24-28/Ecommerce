const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db").development;
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());

const dbase = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

dbase.connect((error) => {
    if (error) {
        console.error("Database Connection Failed:", error.message);
        return;
    }
    console.log("Connected to Database");
});

app.post("/login", (req, res) => {
    const { email, password} = req.body;
    console.log(email, password);


    const query = "SELECT role FROM users WHERE email=? AND password=?";
    console.log(email, password);

    dbase.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Database Query Failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ role: result[0].role });
        console.log(result[0].role);
    });
});

app.get("/products-data", (req, res) => {
    const sql = "SELECT * FROM products";
    dbase.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
})

app.post("/add-products", (req, res) => {
    const { name, des, price, image_url,category } = req.body;
    
    if (!name || !category || !price || !des || !image_url) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = "INSERT INTO products (name, des, price,image_url,category) VALUES (?, ?, ?, ?, ?)";
    
    dbase.query(query, [name, des, price, image_url,category], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Product added successfully!", productId: result.insertId });
    });
});

app.delete("/del-products", (req, res) => {
    const { pid } = req.body;
    
    if (!pid) {
        return res.status(400).json({ error: "Enter Product ID" });
    }

    const query = "DELETE FROM products WHERE p_id = ?";
    
    dbase.query(query, [pid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully!"});
    });
});

app.put("/edit-products", (req, res) => {
    const { name, des, price, image_url, category, pid } = req.body;
    
    if (!pid || !name || !category || !price || !des || !image_url) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = "UPDATE products SET name = ?, des = ?, price = ?, image_url = ?, category = ? WHERE p_id = ?";
    
    dbase.query(query, [name, des, price, image_url, category, pid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product updated successfully!" });
    });
});

app.post("/cart-details",(req,res)=>{
    const {pid,email}=req.body;

    const query ="INSERT into cart (pro_id,user_email) VALUES (?,?)";

    dbase.query(query,[pid,email],(err,result)=>{
        if(err){
            return res.status(500).json({error:err.message});
        }
        res.json({message:"Added to Cart"});
    })
})

app.delete("/delcart-products", (req, res) => {
    const { pid } = req.body;

    const query = "DELETE FROM cart WHERE pro_id = ?";
    
    dbase.query(query, [pid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully!"});
    });
});

app.post("/fetch-addtocart", (req, res) => {
    const { email } = req.body;
    
    console.log("Fetching cart details for:", email); // Debugging
    
    const query = `
        SELECT p.image_url, p.name, p.price ,p.p_id
        FROM products p
        JOIN cart c ON p.p_id = c.pro_id
        WHERE c.user_email = ?
    `;

    dbase.query(query, [email], (err, result) => {
        if (err) {
            console.error("Database Query Failed:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        console.log("Query Result:", result); // Debugging
        
        if (result.length === 0) {
            return res.status(404).json({ error: "No items found in cart" });
        }
        res.status(200).json(result);
    });
});

app.delete("/clear-cart", (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "User email is required" });
    }
  
    const query = "DELETE FROM cart WHERE user_email = ?";
  
    dbase.query(query, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Cart cleared successfully!" });
    });
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});