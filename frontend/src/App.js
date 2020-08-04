import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
import "./css/app.css";
import User from "./Pages/User";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Pages/Home";
import Guidemap from "./Pages/Guidemap";
import Calendar from "./Pages/Calendar";
import FriendsGroup from "./Pages/FriendsGroup";
import FriendsGroupDetail from "./Pages/FriendsGroupDetail";
import FriendsGroupCreate from "./Pages/FriendsGroupCreate";
import FriendsGroupHistory from "./Components/FriendsGroup/FriendsGroupHistory";
import Discussion from "./Pages/Discussion";
import logo from "./imgs/skateboardLogo.png";
import axiosInstance, {
  logoutApi,
  getFriendsGroupApi,
  getUserApi,
} from "./axiosApi";
// import SocialLogin from "./SocialLogin";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MapIcon from "@material-ui/icons/Map";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FaceIcon from "@material-ui/icons/Face";
import EventIcon from "@material-ui/icons/Event";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ForumIcon from "@material-ui/icons/Forum";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";

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
      if (action.payload.data == undefined) {
        return {
          ...state,
          isAuthenticated: true,
          access: localStorage.getItem("access_token"),
          refresh: localStorage.getItem("refresh_token"),
          username: localStorage.getItem("username"),
        };
      } else {
        return {
          ...state,
          isAuthenticated: true,
          access: action.payload.data.access,
          refresh: action.payload.data.refresh,
          username: JSON.parse(action.payload.config.data).username,
        };
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case "UPDATE":
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
    color: "#CA3900",
    fontWeight: 600,
    fontSize: 24,
    textDecoration: "none",
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.success.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const SideMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="forsmallscreen">
      <MenuIcon
        style={{
          width: 35,
          height: 35,
          marginTop: "6vw",
          marginBottom: "auto",
          marginRight: "2vw",
        }}
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavLink to="/guidemap" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <MapIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="地圖" />
          </StyledMenuItem>
        </NavLink>
        <NavLink to="/friendsgroup" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <GroupAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="揪團" />
          </StyledMenuItem>
        </NavLink>
        <NavLink to="/login" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="登入" />
          </StyledMenuItem>
        </NavLink>
        <NavLink to="/signup" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="註冊" />
          </StyledMenuItem>
        </NavLink>
      </StyledMenu>
    </div>
  );
};

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();
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

  useEffect(() => {
    getUserApi(state.username)
      .then((res) => {
        initUserDB(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

  const initUserDB = (newData) => {
    setUserdata(newData);
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
      newValue,
    });
  };

  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);

  const updateFriendsGroupDB = (newData) => {
    setDbFriendsGroupData([...dbFriendsGroupData, newData]);
  };

  const handleLogout = () => {
    logoutApi({
      refresh_token: localStorage.getItem("refresh_token"),
    })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
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
        console.log(error.response);
      });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || null;
    const refreshToken = localStorage.getItem("refresh_token") || null;
    const localUsername = localStorage.getItem("username") || null;

    if (accessToken && refreshToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          access: accessToken,
          refresh: refreshToken,
          username: localUsername,
        },
      });
    }
  }, []);

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        for (let ix in res.data) {
          res.data[ix]["group_startdt"] = `${res.data[ix].group_startdt.slice(
            0,
            10
          )}  ${res.data[ix].group_startdt.slice(11, 19)}`;
        }

        setDbFriendsGroupData(...dbFriendsGroupData, res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
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
          <Link to="/" className="link">
            <span className="logoText">SkateboardGO</span>
          </Link>
        </div>
        <SideMenu />
        <div className="nav forlargescreen">
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
            {state.isAuthenticated && (
              <>
                <li className="nav-link-item">
                  <NavLink
                    to="/user"
                    activeClassName={classes.activelink}
                    className={classes.link}
                  >
                    <FaceIcon style={{ verticalAlign: "middle" }} />
                    <span style={{ verticalAlign: "middle" }}>會員中心</span>
                  </NavLink>
                </li>
                <img
                  src={`https://ui-avatars.com/api/?name=${state.username}&size=50&rounded=true&background=4181ff&color=fff`}
                /><span style={{fontSize:15, marginLeft:5, marginRight:15}}>{state.username}</span>
              </>
            )}
            {!state.isAuthenticated ? (
              <li className="nav-link-btn">
                <Link to="/login/" className="link">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#188af2", color: "white" }}
                  >
                    登入
                  </Button>
                </Link>
              </li>
            ) : (
              <li className="nav-link-btn">
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  style={{ backgroundColor: "#616263", color: "white" }}
                >
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
            <Guidemap
              userData={userData}
              updateUserDB={updateUserDB}
              dbFriendsGroupData={dbFriendsGroupData}
              updateGroupUserDB={updateGroupUserDB}
            />
          )}
        />
        <Route
          exact
          path={"/friendsgroup"}
          key={"route-friendsgroup"}
          render={() => (
            <FriendsGroup
              userData={userData}
              updateUserDB={updateUserDB}
              updateGroupUserDB={updateGroupUserDB}
              dbFriendsGroupData={dbFriendsGroupData}
              updateFriendsGroupDB={updateFriendsGroupDB}
            />
          )}
        />
        <Route
          exact
          path={"/friendsgrouphistory"}
          key={"route-friendsgrouphistory"}
          render={() => (
            <FriendsGroupHistory
              userData={userData}
              updateUserDB={updateUserDB}
              updateGroupUserDB={updateGroupUserDB}
              dbFriendsGroupData={dbFriendsGroupData}
              updateFriendsGroupDB={updateFriendsGroupDB}
            />
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
              dbFriendsGroupData={dbFriendsGroupData}
              updateGroupUserDB={updateGroupUserDB}
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
              dbFriendsGroupData={dbFriendsGroupData}
              updateFriendsGroupDB={updateFriendsGroupDB}
            />
          )}
        />

        <Route
          exact
          path={"/friendsGroupDetail/:id"}
          key={"route-friendsGroupDetail"}
          render={() => <FriendsGroupDetail />}
        />

        <Route
          exact
          path={"/login/"}
          render={() => <Login userData={userData} initUserDB={initUserDB} />}
        />
        <Route exact path={"/signup/"} component={Signup} />
      </Switch>
      <div className="footer">
        <div>Frontend: ReactJS, Material-UI</div>
        <div>Backend: Django(Python), PosgreSQL</div>
        <div>Designed by Sandy Lin, 2020</div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
