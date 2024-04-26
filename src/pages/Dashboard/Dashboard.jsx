import "@fortawesome/fontawesome-free/css/all.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChartBar,
  faClipboardList,
  faHistory,
  faMoneyBillWave,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"; // Example icon, you can choose any other icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";

library.add(
  faShoppingCart,
  faClipboardList,
  faMoneyBillWave,
  faUsers,
  faChartBar,
  faHistory
);

function Dashboard() {
  const cardData = [
    {
      title: "2487",
      description: "Items in Our Stores",
      iconName: faShoppingCart, // Use the actual icon object
    },
    { title: "175", description: "Total Orders", iconName: faClipboardList },
    {
      title: "RS.75845",
      description: "Today Income",
      iconName: faMoneyBillWave,
    },
    { title: "428", description: "Total Customers", iconName: faUsers },
    {
      title: "Income Report",
      description: "Generate Income Report",
      iconName: faChartBar,
    },
    { title: "History", description: "Order History", iconName: faHistory },
  ];

  return (
    <div className="main-cont">
      <h1 className="centered-title">Dashboard</h1>

      <Container>
        {/* First Row with 4 Cards */}
        <Row className="mb-4">
          {cardData.slice(0, 4).map((card, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="aspect-ratio-card">
                <Card.Body className="card-content-center">
                  <Card.Title className="card-title">
                    <FontAwesomeIcon icon={card.iconName} className="mr-2" />{" "}
                    {/* Added this line for the icon */}
                    {card.title}
                  </Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Second Row with 2 Cards */}
        <Row className="justify-content-md-center">
          {cardData.slice(4, 6).map((card, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="aspect-ratio-card">
                <Card.Body className="card-content-center">
                  <Card.Title className="card-title">
                    <FontAwesomeIcon icon={card.iconName} className="mr-2" />{" "}
                    {/* Added this line for the icon */}
                    {card.title}
                  </Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
