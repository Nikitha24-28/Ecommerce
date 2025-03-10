import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from "axios";
import "./Add.css";

// Define table columns (excluding `des` and `image_url`)
const columns = [
  { width: 50, label: "ID", dataKey: "p_id", numeric: true },
  { width: 150, label: "Name", dataKey: "name" },
  { width: 70, label: "Category", dataKey: "category" },
  { width: 110, label: "Price (₹)", dataKey: "price", numeric: true },
];

export default function Add() {
  const [rows, setRows] = useState([]);
  const [formdata,setFormdata]=useState({
    name:"",
    des:"",
    price:"",
    image_url:"",
    category:""
  });
  const [pid,setPid]=useState("");
  const [edit,setEdit]=useState({
    pid:"",
    name:"",
    des:"",
    price:"",
    image_url:"",
    category:""
  });
  

  // Fetch product data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/products-data")
      .then((response) => {
        // Exclude 'des' and 'image_url' before setting state
        const filteredData = response.data.map(({ des, image_url, ...rest }) => rest);
        setRows(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Table structure for virtualization
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
    ),
    TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
    TableRow,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  // Fixed header -->Table
  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric ? "right" : "left"}
            style={{ width: column.width }}
            sx={{ backgroundColor: "background.paper" }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  // Render each row --> table
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align={column.numeric ? "right" : "left"}>
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  //modal styling 
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [openadd, setOpenadd] = React.useState(false);
  const handleOpenadd = () => setOpenadd(true);
  const handleCloseadd = () => setOpenadd(false);

  const [opendel, setOpendel] = React.useState(false);
  const handleOpendel = () => setOpendel(true);
  const handleClosedel = () => setOpendel(false);

  const [openedit, setOpenedit] = React.useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleChangedel=(e)=>{
    setPid(e.target.value);
  }

  const handleChangeedit = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };


  const handleSubmitadd = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/add-products", formdata)
      .then(() => {
        setFormdata({ name: "", des: "", price: "", image_url: "", category: "" });
        setOpenadd(false);
        // Fetch data again to update the table
        axios.get("http://localhost:5000/products-data")
          .then((response) => {
            const filteredData = response.data.map(({ des, image_url, ...rest }) => rest);
            setRows(filteredData);
          })
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error adding product:", error));
  };  

  const handleSubmitdel = (e) => {
    e.preventDefault();
    
    axios.delete("http://localhost:5000/del-products", { data: { pid }})
    .then(response => {
      console.log(response.data);
      setOpendel(false);
      setPid("");
  
      // Fetch updated data after deletion
      axios.get("http://localhost:5000/products-data")
        .then((response) => {
          const filteredData = response.data.map(({ des, image_url, ...rest }) => rest);
          setRows(filteredData);
        })
        .catch((error) => console.error("Error fetching updated data:", error));
    })
    .catch(error => console.error("Error deleting product:", error));
  };
  
  const handleSubmitedit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/edit-products", edit)
      .then(() => {
        setEdit({ pid: "", name: "", des: "", price: "", image_url: "", category: "" });
        setOpenedit(false);
  
        // Fetch updated data after edit
        axios.get("http://localhost:5000/products-data")
          .then((response) => {
            const filteredData = response.data.map(({ des, image_url, ...rest }) => rest);
            setRows(filteredData);
          })
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error updating product:", error));
  };  

  return (
    <div className="Addpage">
      <h1>Admin's Canvas</h1>
      <div className="buttonspace">
        <div>
          <Button variant="outlined" onClick={handleOpenadd}>Add</Button> 
          <Modal
            open={openadd}
            onClose={handleCloseadd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <h1>Fill to add a new Product</h1>
                <form onSubmit={handleSubmitadd}>
                  <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }} name="name" label="Product name" variant="outlined"  value={formdata.name} onChange={handleChange}/>
                  <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px"}} name="des" label="Description" variant="outlined"  value={formdata.des} onChange={handleChange}/>
                  <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px"}} name="price" label="Price" variant="outlined"  value={formdata.price} onChange={handleChange}/>
                  <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }} name="image_url" label="Image URL" variant="outlined"  value={formdata.image_url} onChange={handleChange}/>
                  <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px",marginBottom:"20px"}} name="category" label="Category" variant="outlined"  value={formdata.category} onChange={handleChange}/>
                  <Button type="submit" variant="contained" fullWidth>Add Product</Button>
                </form>
            </Box>
          </Modal>
        </div>
        <div>
          <Button variant="outlined" onClick={handleOpendel}>Delete</Button>
          <Modal
            open={opendel}
            onClose={handleClosedel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>Fill to delete a product</h1>
              <form onSubmit={handleSubmitdel}>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0" ,marginTop:"10px",marginBottom:"20px"}} label="Product ID" variant="outlined"  value={pid} onChange={handleChangedel}/>
                <Button type="submit" variant="contained" fullWidth>Delete</Button>
              </form>
            </Box>
          </Modal>
        </div>
        <div>
          <Button variant="outlined" onClick={handleOpenedit}>Edit</Button>
          <Modal
            open={openedit}
            onClose={handleCloseedit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>Fill to edit a product</h1>
              <form onSubmit={handleSubmitedit}>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }} name="pid" label="Product ID (cannot be edited)" variant="outlined"  value={edit.pid} onChange={handleChangeedit}/>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }}name="name" label="Product name" variant="outlined"  value={edit.name} onChange={handleChangeedit}/>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0" ,marginTop:"10px"}}name="des" label="Description" variant="outlined"  value={edit.des} onChange={handleChangeedit}/>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }}name="price" label="Price" variant="outlined"  value={edit.price} onChange={handleChangeedit}/>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0",marginTop:"10px" }}name="image_url" label="Image URL" variant="outlined"  value={edit.image_url} onChange={handleChangeedit}/>
                <TextField style={{ width: "400px", backgroundColor: "#f0f0f0" ,marginTop:"10px",marginBottom:"20px"}}name="category" label="Category" variant="outlined"  value={edit.category} onChange={handleChangeedit}/>
                <Button type="submit" variant="contained" fullWidth>Update</Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    
      <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
    </div>
  );
}