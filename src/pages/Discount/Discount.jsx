import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "./Discount.css"; // You can create a CSS file for styling if needed
import { Link } from "react-router-dom";

function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [editDiscount, setEditDiscount] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:8092/discount/allDiscount")
      .then((response) => response.json())
      .then((data) => setDiscounts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (discount) => {
    setEditDiscount(discount);
  };

  const handleSave = () => {
    fetch(`http://localhost:8092/discount/discount/${editDiscount.did}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editDiscount)
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Discount ${editDiscount.did} updated successfully.`);
          setEditDiscount(null); // Clear editDiscount after saving
          // Fetch updated discount list and set it as state to refresh the table
          fetch("http://localhost:8092/discount/allDiscount")
            .then((response) => response.json())
            .then((data) => setDiscounts(data))
            .catch((error) => console.error("Error fetching data:", error));
        } else {
          console.error(`Failed to update discount ${editDiscount.did}.`);
        }
      })
      .catch((error) => {
        console.error("Error updating discount:", error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8092/discount/discount/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Discount ${id} deleted successfully.`);
          setDiscounts(discounts.filter((discount) => discount.did !== id));
        } else {
          console.error(`Failed to delete discount ${id}.`);
        }
      })
      .catch((error) => {
        console.error("Error deleting discount:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDiscount({ ...editDiscount, [name]: value });
  };

  return (
    <div className="main-cont1">
      <h1>Discounts</h1>
      <Link to="/addDiscount">
        <Button>Add Discounts</Button>
      </Link>
      <br />
      <div className="table-container">
        {editDiscount ? (
          <div>
            <h2>Edit Discount</h2>
            <Form>
              <Form.Group controlId="formDiscountName">
                <Form.Label>Discount Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter discount name"
                  name="discountName"
                  value={editDiscount.discountName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formDiscountAmount">
                <Form.Label>Discount Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount amount"
                  name="discountAmount"
                  value={editDiscount.discountAmount}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formDiscountType">
                <Form.Label>Discount Type</Form.Label>
                <Form.Control
                  as="select"
                  name="discountType"
                  value={editDiscount.discountType}
                  onChange={handleChange}
                >
                  <option value="value">Value</option>
                  <option value="percentage">Percentage</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditDiscount(null)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Discount Name</th>
                <th>Discount Amount</th>
                <th>Discount Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.did}>
                  <td>{discount.did}</td>
                  <td>{discount.discountName}</td>
                  <td>{discount.discountAmount}</td>
                  <td>{discount.discountType}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      role="img"
                      aria-label="edit"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(discount)}
                    >
                      ✏️
                    </span>
                    <span
                      role="img"
                      aria-label="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(discount.did)}
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

export default Discounts;
