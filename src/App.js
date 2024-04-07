import React, { useState } from "react";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import DiscussionBoard from "./component/DiscussionBoard";
import ChatThread from "./component/ChatThread";
import Payment from "./component/Payment";
import CalendarPage from "./component/Calendar";
import Maintenance from "./component/Maintenance";
import Footer from "./component/Footer";
import SigninForm from "./component/SigninForm";
import "./App.css";

const containerStyle = {
  position: "relative",
  minHeight: "100vh",
};

const imageStyle = {
  width: "100%",
  height: "100vh",
  objectFit: "cover",
};

const headerStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  padding: "20px 0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "row",
};

const buttonStyle = {
  marginRight: "10px",
  background: "transparent",
  color: "white",
  border: "none",
};

const Home = () => {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://iiif.micr.io/ZKSPH/full/1280,/0/default.jpg" //replace with apartment image
        alt="Community Image"
        style={imageStyle}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h1 style={{ color: "white", fontSize: "3rem" }}>
          Welcome to Our Community Hub!
        </h1>
      </div>
      <div style={{ ...headerStyle, justifyContent: "space-between" }}>
        <div style={buttonContainerStyle}>
          <Link to="/discussions">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button" //hover doesn't work right now
            >
              Discussion Board
            </Button>
          </Link>
          <Link to="/chat">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button"
            >
              Chat Thread
            </Button>
          </Link>
          <Link to="/maintenance">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button"
            >
              Maintenance Order
            </Button>
          </Link>
          <Link to="/calendar">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button"
            >
              Calendar Events
            </Button>
          </Link>
          <Link to="/payment">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button"
            >
              Payment Tool
            </Button>
          </Link>
        </div>
        <Button
          type="primary"
          size="large"
          style={{ marginRight: "20px" }}
          onClick={showModal}
        >
          <UserOutlined /> Login
        </Button>
        <SigninForm
          isVisible={isModalVisible}
          handleVisibility={handleCancel}
        />
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Define the root path to render the Home component */}
        <Route path="/" exact component={Home} />
        {/* Define the path for the discussion board, which renders the DiscussionBoard component */}
        <Route path="/discussions" component={DiscussionBoard} />
        <Route path="/chat" component={ChatThread} />
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/payment" component={Payment} />
      </Switch>
    </Router>
  );
};

export default App;
