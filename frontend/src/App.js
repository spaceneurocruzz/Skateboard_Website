import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
import User from "./Pages/User";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Pages/Home";
import Guidemap from "./Pages/Guidemap";
import Calendar from "./Pages/Calendar";
import FriendsGroup from "./Pages/FriendsGroup";

import FriendsGroupCreate from "./Pages/FriendsGroupCreate";
import Discussion from "./Pages/Discussion";
import "./css/app.css";
import logo from "./imgs/skateboardLogo.png";
import axiosInstance, { logoutApi, getUserApi } from "./axiosApi";
// import SocialLogin from "./SocialLogin";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MapIcon from "@material-ui/icons/Map";
import EventIcon from "@material-ui/icons/Event";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ForumIcon from "@material-ui/icons/Forum";

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

const useStyles = makeStyles((theme) => ({
  link: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    "&:hover": {
      background: "#c6f0a6",
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      paddingLeft: 10,
      borderRadius: 10,
    },
    color: "#e9710f",
    fontWeight: 600,
    fontSize: 20,
    textDecoration: "none",
    // backgroundColor: '#2e1534',
    backgroundSize: "cover",
  },
  activelink: {
    background: "#c6f0a6",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
}));

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const initUserData = {
    location: "",
    nickname: "",
    intro: "",
    //avatar: "",
    email: "",
    map_like: [],
    map_add: [],
    map_comment: [],
    group_create: [],
    group_join: [],
    group_like: [],
  };

  const [userData, setUserdata] = useState(initUserData);

  const initUserDB = (newData) => {
    setUserdata(newData);
    console.log(userData);
  };

  const updateUserDB = (eventTarget) => {
    setUserdata({
      ...userData,
      [eventTarget.name]: eventTarget.value,
    });
  };

  const updateGroupUserDB = (newValue) => {
    setUserdata({
      ...userData,
      newValue
    });
  };

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
              <NavLink
                to="/guidemap"
                activeClassName={classes.activelink}
                className={classes.link}
              >
                <MapIcon style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>地圖</span>
              </NavLink>
            </li>
            {/* <li className="nav-link-item">
              <NavLink
                to="/calendar"
                activeClassName={classes.activelink}
                className={classes.link}
              >
                <EventIcon style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>活動日曆</span>
              </NavLink>
            </li> */}
            <li className="nav-link-item">
              <NavLink
                to="/friendsgroup"
                activeClassName={classes.activelink}
                className={classes.link}
              >
                <PeopleAltIcon style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>揪團</span>
              </NavLink>
            </li>
            {/* <li className="nav-link-item">
              <NavLink
                to="/discussion"
                activeClassName={classes.activelink}
                className={classes.link}
              >
                <ForumIcon style={{ verticalAlign: "middle" }} />
                <span style={{ verticalAlign: "middle" }}>技術交流</span>
              </NavLink>
            </li> */}
            {/* {state.isAuthenticated && ( */}
              <li className="nav-link-item">
                <NavLink
                  to="/user"
                  activeClassName={classes.activelink}
                  className={classes.link}
                >
                  <MapIcon style={{ verticalAlign: "middle" }} />
                  <span style={{ verticalAlign: "middle" }}>會員中心</span>
                </NavLink>
              </li>
            {/* )} */}
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
          render={() => (
            <Guidemap userData={userData} updateUserDB={updateUserDB} />
          )}
        />
        <Route
          exact
          path={"/friendsgroup"}
          key={"route-friendsgroup"}
          render={() => (
            <FriendsGroup userData={userData} updateUserDB={updateUserDB} updateGroupUserDB={updateGroupUserDB}/>
          )}
        />
        <Route
          exact
          path={"/user"}
          key={"route-user"}
          render={() => (
            <User
              userData={userData}
              updateUserDB={updateUserDB}
              initUserDB={initUserDB}
            />
          )}
        />
        <Route
          exact
          path={"/friendsGroup/create"}
          key={"route-friendsGroupCreate"}
          render={() => (
            <FriendsGroupCreate
              userData={userData}
              updateUserDB={updateUserDB}
            />
          )}
        />
        <Route exact path={"/login/"} component={Login} />
        <Route exact path={"/signup/"} component={Signup} />
      </Switch>
      <div className="footer">Copyright</div>
    </AuthContext.Provider>
  );
};

export default App;
