import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
import User from "./Pages/User";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Pages/Home";
import Guidemap from "./Pages/Guidemap";
import Calendar from "./Pages/Calendar";
import FriendsGroup from "./Pages/FriendsGroup";

import FriendsGroupCreate from "./Pages/FriendsGroupCreate"
import Discussion from "./Pages/Discussion";
import "./css/app.css";
import logo from "./imgs/skateboardLogo.png";
import axiosInstance, {logoutApi} from "./axiosApi";
// import SocialLogin from "./SocialLogin";

import Button from "@material-ui/core/Button";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  access: null,
  refresh: null,
  username: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload.data.access,
        refresh: action.payload.data.refresh,
        username: JSON.parse(action.payload.config.data).username,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case "UPDATE":
      console.log(state);
      console.log(action);
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();

  const handleLogout = () => {
    logoutApi({
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
      })
      .then(() => {
        dispatch({
          type: "LOGOUT",
        });
      })
      .then(() => {
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || null;
    const refreshToken = localStorage.getItem("refresh_token") || null;

    if (accessToken && refreshToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          access: accessToken,
          refresh: refreshToken,
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="header">
        <div className="logo">
          <Link to="/" className="link">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="nav">
          <ul className="nav-link">
            <li className="nav-link-item">
              <Link to="/guidemap" className="link">
                地圖
              </Link>
            </li>
            <li className="nav-link-item">
              <Link to="/calendar" className="link">
                活動日曆
              </Link>
            </li>
            <li className="nav-link-item">
              <Link to="/friendsgroup" className="link">
                揪團
              </Link>
            </li>
            <li className="nav-link-item">
              <Link to="/discussion" className="link">
                技術交流
              </Link>
            </li>
            {state.isAuthenticated &&
            <li className="nav-link-item">
              <Link to="/user" className="link">
                會員中心
              </Link>
            </li>
            }
            {!state.isAuthenticated ? (
              <li className="nav-link-btn">
                <Link to="/login/" className="link">
                  <Button variant="contained" color="secondary">
                    登入
                  </Button>
                </Link>
              </li>
            ) : (
              <li className="nav-link-btn">
                <Button onClick={handleLogout} variant="contained">
                  登出
                </Button>
              </li>
            )}
            {!state.isAuthenticated && (
              <li className="nav-link-btn">
                <Link to="/signup/" className="link">
                  <Button variant="contained" color="primary">
                    註冊
                  </Button>
                </Link>
              </li>
            )}
            {/* <SocialLogin /> */}
          </ul>
        </div>
      </div>

      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route
          exact
          path={"/guidemap"}
          key={"route-guidemap"}
          render={() => <Guidemap />}
        />
        <Route
          exact
          path={"/friendsgroup"}
          key={"route-friendsgroup"}
          render={() => <FriendsGroup />}
        />
        <Route
          exact
          path={"/user"}
          key={"route-user"}
          render={() => <User />}
        />
          <Route
          exact
          path={"/friendsGroup/create"}
          key={"route-friendsGroupCreate"}
          render={() => <FriendsGroupCreate />}
        />
        <Route exact path={"/login/"} component={Login} />
        <Route exact path={"/signup/"} component={Signup} />
      </Switch>
      <div className="footer">Copyright</div>
    </AuthContext.Provider>
  );
};

export default App;
