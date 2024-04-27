import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SidePanel.css";

const SidePanel = () => {
  const [activeRoute, setActiveRoute] = useState(window.location.pathname);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverStates, setHoverStates] = useState({});

  return (
    <div className="side-panel">
      <h1 className="website-name">POS System</h1>
      <hr className="line" />
      <div className="buttons-section">
        <NavLink to="/dashboard" activeClassName="selected-button">
          <MDBBtn
            block
            color={activeRoute === "/dashboard" ? "white" : "green"}
            className="p-3 mb-2 align-left custom-btn-color"
            style={{
              boxShadow: "none",
              border: "none",
              color:
                activeRoute === "/dashboard"
                  ? "#000"
                  : hoverStates["/dashboard"]
                  ? "#000"
                  : "#fff",
            }}
            onClick={() => setActiveRoute("/dashboard")}
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, "/dashboard": true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, "/dashboard": false }))
            }
          >
            <MDBIcon
              fas
              icon="tachometer-alt"
              className="me-2 ms-2"
              style={{ boxShadow: "none", border: "none" }}
            />
            Dashboard
          </MDBBtn>
        </NavLink>
        <NavLink to="/product" activeClassName="selected-button">
          <MDBBtn
            block
            color={activeRoute === "/product" ? "white" : "green"}
            className="p-3 mb-2 align-left custom-btn-color"
            style={{
              boxShadow: "none",
              border: "none",
              color:
                activeRoute === "/product"
                  ? "#000"
                  : hoverStates["/product"]
                  ? "#000"
                  : "#fff",
            }}
            onClick={() => setActiveRoute("/product")}
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, "/product": true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, "/product": false }))
            }
          >
            <MDBIcon fas icon="box" className="me-2 ms-2" />
            Products
          </MDBBtn>
        </NavLink>
        <NavLink to="/order" activeClassName="selected-button">
          <MDBBtn
            block
            color={activeRoute === "/order" ? "white" : "green"}
            className="p-3 mb-2 align-left custom-btn-color"
            style={{
              boxShadow: "none",
              border: "none",
              color:
                activeRoute === "/order"
                  ? "#000"
                  : hoverStates["/order"]
                  ? "#000"
                  : "#fff",
            }}
            onClick={() => setActiveRoute("/order")}
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, "/order": true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, "/order": false }))
            }
          >
            <MDBIcon fas icon="shopping-cart" className="me-2 ms-2" />
            Orders
          </MDBBtn>
        </NavLink>
        <NavLink to="/customer" activeClassName="selected-button">
          <MDBBtn
            block
            color={activeRoute === "/customer" ? "white" : "green"}
            className="p-3 mb-2 align-left custom-btn-color"
            style={{
              boxShadow: "none",
              border: "none",
              color:
                activeRoute === "/customer"
                  ? "#000"
                  : hoverStates["/customer"]
                  ? "#000"
                  : "#fff",
            }}
            onClick={() => setActiveRoute("/customer")}
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, "/customer": true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, "/customer": false }))
            }
          >
            <MDBIcon fas icon="users" className="me-2 ms-2" />
            Users
          </MDBBtn>
        </NavLink>

        <NavLink to="/allsupplier" activeClassName="selected-button">
          <MDBBtn
            block
            color={activeRoute === "/allsupplier" ? "white" : "green"}
            className="p-3 mb-2 align-left custom-btn-color"
            style={{
              boxShadow: "none",
              border: "none",
              color:
                activeRoute === "/allsupplier"
                  ? "#000"
                  : hoverStates["/allsupplier"]
                  ? "#000"
                  : "#fff",
            }}
            onClick={() => setActiveRoute("/allsupplier")}
            onMouseEnter={() =>
              setHoverStates((prev) => ({ ...prev, "/allsupplier": true }))
            }
            onMouseLeave={() =>
              setHoverStates((prev) => ({ ...prev, "/allsupplier": false }))
            }
          >
            <MDBIcon fas icon="truck" className="me-2 ms-2" />
            Suppliers
          </MDBBtn>
        </NavLink>
      </div>

      <div className="logout-section" activeClassName="selected-button">
        <hr className="line" />
        <NavLink to="/">
          <MDBBtn
            block
            color="green"
            className="p-3 mb-4 align-left custom-btn-color"
            style={{ boxShadow: "none", border: "none" }}
          >
            <MDBIcon fas icon="sign-out-alt" className="me-2 ms-2" />
            Log Out
          </MDBBtn>
        </NavLink>
      </div>
    </div>
  );
};

export default SidePanel;
