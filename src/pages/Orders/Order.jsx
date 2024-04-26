import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Order.css";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:5000/order/all")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="main-cont1">
      <h1>Orders</h1>

      <div className="table-container">
        <Table bordered className="order-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Products (with Quantity)</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userID.username}</td>
                <td>
                  {order.products.map((product) => (
                    <div key={product._id}>
                      {product.productID.productName} (x{product.quantity})
                    </div>
                  ))}
                </td>
                <td>${order.totalAmount}0</td>
                <td>{order.orderStatus}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td style={{ textAlign: "center" }}>
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

export default Order;
