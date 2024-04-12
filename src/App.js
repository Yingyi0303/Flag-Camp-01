import React, { useState } from "react";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import DiscussionBoard from "./component/DiscussionBoard";
//import ChatThread from "./component/ChatThread";
import Payment from "./component/Payment";
import CalendarPage from "./component/Calendar";
import Maintenance from "./component/Maintenance";
import Footer from "./component/Footer";
import SigninForm from "./component/SigninForm";
import SignupForm from "./component/SignupForm";
import MaintenanceOrder from "./component/MaintanceOrderThird";

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
  const { user, logout } = useAuth();
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeForm, setActiveForm] = useState("signin");

  // Function to show the modal
  const showModal = (formType) => {
    setIsModalVisible(true);
  };

  // Function to handle closing the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setActiveForm("signin"); // Reset to signin on close
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
          {/* <Link to="/chat">
            <Button
              type="primary"
              size="large"
              style={buttonStyle}
              className="custom-button"
            >
              Chat Thread
            </Button>
          </Link> */}
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

        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <Avatar style={{ backgroundColor: "#f56a00", marginRight: "10px" }}>
            {" "}
            {/* You can use the first letter of the username if available */}
            {user && user.username[0]}
          </Avatar>
          {user && (
            <span style={{ color: "white", marginRight: "20px" }}>
              {user.username}
            </span>
          )}
          <Button type="primary" onClick={logout}>
            <UserOutlined /> Logout
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <SigninForm />}
      </Route>
      <PrivateRoute path="/" exact component={Home} />
      {/* Define the path for the discussion board, which renders the DiscussionBoard component */}
      <PrivateRoute path="/discussions" component={DiscussionBoard} />
      {/* <Route path="/chat" component={ChatThread} /> */}
      <PrivateRoute path="/maintenance" component={Maintenance} />
      <PrivateRoute path="/calendar" component={CalendarPage} />
      <PrivateRoute path="/payment" component={Payment} />
      <PrivateRoute path="/maintenanceorder" component={MaintenanceOrder} />
    </Switch>
  );
};

export default App;
