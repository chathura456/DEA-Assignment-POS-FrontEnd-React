import {
  MDBBtn,
  MDBCard,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //to run admin panel with backend
  const handleButtonClick = () => {
    // Create the request body
    const requestBody = {
      email: email,
      password: password,
    };

    // Make the HTTP POST request
    fetch("http://localhost:8092/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setLoading(true);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000); // 2 seconds delay
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("Server error : "+error);
      });
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center"
      style={{
        backgroundImage: `url("https://www.touchdynamic.com/wp-content/uploads/2019/04/all-in-one-pos-cornerstone.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <MDBRow
        style={{
          display: "grid",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MDBCol
          style={{
            display: "flex",
            justifyContent: "center",

          }}
        >
          <MDBCard
          className="p-5"
          style={{ 
            maxWidth: "400px", 
            width: "100%", // Flexible width
            minWidth: "300px" // Smaller minimum width for smaller screens
          }}
        >
            <h2 className="mb-4" style={{ textAlign: "center" }}>
              Login
            </h2>
            <MDBInput
              wrapperClass={`mb-4 ${email ? "has-text" : ""}`}
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-1"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-end mb-4">
              <a href="!#">Forgot password?</a>
            </div>

            <div>
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "3rem" }}
                >
                  <div
                    className="spinner-border text-success"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  ></div>
                </div>
              ) : (
                <MDBBtn
                  className="mb-2 w-100"
                  
                  size="lg"
                  onClick={handleButtonClick}
                >
                  Sign in
                </MDBBtn>
              )}
            </div>
            <div className="d-flex justify-content-center mt-1">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
