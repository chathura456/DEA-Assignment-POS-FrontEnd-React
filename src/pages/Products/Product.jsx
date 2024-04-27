import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [editProducts, setEditProducts] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:8092/products/allProducts")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (product) => {
    setEditProducts(product);
  };

  const handleSave = () => {

    fetch(`http://localhost:8092/products/products/${editProducts.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editProducts)
    })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log(`product ${editProducts.id} updated successfully.`);
          setEditProducts(null); // Clear editproduct after saving

          // Fetch updated product list and set it as state to refresh the table
          fetch("http://localhost:8092/products/allProducts")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching data:", error));
        } else {
          // Handle error
          console.error(`Failed to update product ${editProducts.id}.`);
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };


  const handleDelete = (id) => {
    // Implement delete functionality here
    fetch(`http://localhost:8092/products/products/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log(`product ${id} deleted successfully.`);
          // Remove the deleted product from the state
          setProducts(products.filter(product => product.id !== id));
        } else {
          // Handle error
          console.error(`Failed to delete product ${id}.`);
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProducts({ ...editProducts, [name]: value });
  };

  return (
    <div className="main-cont1">
      <h1>Products</h1>
      <Link to="/addproduct">
        <Button>Add Product</Button>
      </Link>
      <br />
      <div className="table-container">
        {editProducts ? (
          <div>
            <h2>Edit Product</h2>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="pname"
                  value={editProducts.pname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="pamount"
                  value={editProducts.pamount}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="quantity"
                  value={editProducts.quantity}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditProducts(null)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product name</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.pname}</td>
                  <td>{product.pamount}</td>
                  <td>{product.quantity}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      role="img"
                      aria-label="edit"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(product)}
                    >
                      ✏️
                    </span>
                    <span
                      role="img"
                      aria-label="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Product;
