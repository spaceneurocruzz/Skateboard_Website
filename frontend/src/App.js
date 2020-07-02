import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Switch, Route } from "react-router";
import User from "./Pages/User";
import Home from "./Pages/Home";
import Map from "./Pages/Map";
import Calendar from "./Pages/Calendar";
import Friends from "./Pages/Friends";
import Discussion from "./Pages/Discussion";
import "./css/app.css";
import logo from "./imgs/skateboardLogo.png";

const BaseLayout = () => (
  <>
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="nav">
        <ul className="nav-link">
          <li className="nav-link-item">
            <Link to="/map" className="link">
              地圖
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/calendar" className="link">
              活動日曆
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/friends" className="link">
              揪團
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/discussion" className="link">
              技術交流
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/user" className="link">
              登入
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path={"/user"} key={"route-user"} render={() => <User />} />
    </Switch>
    <div className="footer">Copyright</div>
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  );
};

export default App;
