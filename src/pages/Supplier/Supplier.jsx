import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "./Supplier.css";
import { Link } from "react-router-dom";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [editSupplier, setEditSupplier] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:8092/api/allsupplier")
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (supplier) => {
    setEditSupplier(supplier);
  };

  const handleSave = () => {
    
    fetch(`http://localhost:8092/api/suppliers/${editSupplier.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editSupplier)
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`Supplier ${editSupplier.id} updated successfully.`);
        setEditSupplier(null); // Clear editSupplier after saving
  
        // Fetch updated supplier list and set it as state to refresh the table
        fetch("http://localhost:8092/api/allsupplier")
          .then((response) => response.json())
          .then((data) => setSuppliers(data))
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        // Handle error
        console.error(`Failed to update supplier ${editSupplier.id}.`);
      }
    })
    .catch(error => {
      console.error('Error updating supplier:', error);
    });
  };
  

  const handleDelete = (id) => {
    // Implement delete functionality here
    fetch(`http://localhost:8092/api/suppliers/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`Supplier ${id} deleted successfully.`);
        // Remove the deleted supplier from the state
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      } else {
        // Handle error
        console.error(`Failed to delete supplier ${id}.`);
      }
    })
    .catch(error => {
      console.error('Error deleting supplier:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSupplier({ ...editSupplier, [name]: value });
  };

  return (
    <div className="main-cont1">
      <h1>Suppliers</h1>
      <Link to="/AddSupplier">
        <Button>Add Supplier</Button>
      </Link>
      <br />
      <div className="table-container">
        {editSupplier ? (
          <div>
            <h2>Edit Supplier</h2>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={editSupplier.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={editSupplier.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editSupplier.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  placeholder="Enter address"
                  name="address"
                  value={editSupplier.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formContact">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  type="contact"
                  placeholder="Enter Contact Number"
                  name="contact"
                  value={editSupplier.contact}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditSupplier(null)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.firstName}</td>
                  <td>{supplier.lastName}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.contact}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      role="img"
                      aria-label="edit"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(supplier)}
                    >
                      ✏️
                    </span>
                    <span
                      role="img"
                      aria-label="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(supplier.id)}
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

export default Suppliers;
