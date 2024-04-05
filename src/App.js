import React from "react";
import ReactDOM from "react-dom";
import { Button, Calendar } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import DiscussionBoard from "./component/DiscussionBoard";
import ChatThread from "./component/ChatThread";
import Payment from "./component/Payment";
import CalendarPage from "./component/Calendar";
import Maintenance from "./component/Maintenance";

// Separate component for the home or landing page
const Home = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <img
      src="https://iiif.micr.io/ZKSPH/full/1280,/0/default.jpg"
      alt="Community Image"
      style={{ maxWidth: "30%", marginBottom: "20px" }}
    />
    <div>
      <Link to="/discussions">
        <Button type="primary" size="large" style={{ marginRight: "10px" }}>
          Discussion Board
        </Button>
      </Link>

      {/* Other buttons */}
      <Link to="/chat">
        <Button type="primary" size="large" style={{ marginRight: "10px" }}>
          Chat Thread
        </Button>
      </Link>

      <Link to="/maintenance">
        <Button type="primary" size="large" style={{ marginRight: "10px" }}>
          Maintanence Order
        </Button>
      </Link>

      <Link to="/calendar">
        <Button type="primary" size="large" style={{ marginRight: "10px" }}>
          Calendar Events
        </Button>
      </Link>

      <Link to="/payment">
        <Button type="primary" size="large" style={{ marginRight: "10px" }}>
          Payment Tool
        </Button>
      </Link>
    </div>
  </div>
);

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
