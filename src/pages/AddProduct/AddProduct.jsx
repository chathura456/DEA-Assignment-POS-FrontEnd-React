import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    barcode: "",
    productPrice: "",
    productStock: "",
    description: "",
    imageUri: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Product added successfully!" });

        // Clear the input fields by resetting the product state
        setProduct({
          productName: "",
          barcode: "",
          productPrice: "",
          productStock: "",
          description: "",
          imageUri: "",
        });
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Error adding product.",
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    }
  };
  return (
    <div className="main-cont1">
      <h1>Add Product</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="barcode">
            <Form.Label>Barcode</Form.Label>
            <Form.Control
              type="text"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              name="productPrice"
              value={product.productPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="productStock">
            <Form.Label>Product Stock</Form.Label>
            <Form.Control
              type="number"
              name="productStock"
              value={product.productStock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="imageUri">
            <Form.Label>Image URI</Form.Label>
            <Form.Control
              type="text"
              name="imageUri"
              value={product.imageUri}
              onChange={handleChange}
            />
          </Form.Group>
          <br />

          <Button
            variant="primary"
            style={{ backgroundColor: "green", alignSelf: "center" }}
            type="submit"
          >
            Add Product
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProduct;
