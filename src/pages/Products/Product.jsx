import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Products.css";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:5000/products/all")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="main-cont1">
      <h1>Product Page</h1>
      <Link to="/addproduct">
        <Button>Add Products</Button>
      </Link>
      <br />
      <div className="table-container">
        <Table bordered className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Description</th>
              <th>Barcode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td style={{ width: "80px" }}>$ {product.productPrice}0</td>
                <td>{product.productStock}</td>
                <td>
                  <img
                    src={product.imageUri}
                    alt={product.productName}
                    width="50"
                  />
                </td>
                <td>{product.description}</td>
                <td>{product.barcode}</td>
                <td style={{ textAlign: "center", width: "100px" }}>
                  <span
                    role="img"
                    aria-label="edit"
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  >
                    ✏️
                  </span>
                  <span
                    role="img"
                    aria-label="delete"
                    style={{ cursor: "pointer" }}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Product;
