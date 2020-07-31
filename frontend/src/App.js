import React, { useState, useEffect } from "react";
import {
  patchUserApi,
  patchGuidemapApi,
  patchFriendsGroupApi
} from "./axiosApi";
import { Link, NavLink } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
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
import "./css/app.css";
import logo from "./imgs/skateboardLogo.png";
import axiosInstance, {
  logoutApi,
  getFriendsGroupApi,
  getGuidemapApi,
  getUserApi,
} from "./axiosApi";
// import SocialLogin from "./SocialLogin";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MapIcon from "@material-ui/icons/Map";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import FaceIcon from "@material-ui/icons/Face";
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
      if (action.payload.data == undefined) {
        console.log(state);

        return {
          ...state,
          isAuthenticated: true,
          access: localStorage.getItem("access_token"),
          refresh: localStorage.getItem("refresh_token"),
          username: localStorage.getItem("username"),
          // username: JSON.parse(action.payload.config.data).username,
        };
      } else {
        console.log(action);
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
    console.log(newData);
  };

  const updateUserDB = (eventTarget) => {
    setUserdata({
      ...userData,
      [eventTarget.name]: eventTarget.value,
    });
  };

  const getMapDBByLocationId = (locationId) => {
    if (dbGuideMapData != undefined) {
      return dbGuideMapData.find(
        (data) => data.location_id === locationId
      );
    } else {
      return null;
    }
  };

  const updateMapDBByLocationId = (locationId, newData, type) => {
    let index = dbGuideMapData.findIndex(
      (data) => data.location_id === locationId
    );

    switch (type) {
      case "RATING":
        dbGuideMapData[index].rating = newData;
        break;
      case "LIKE":
        dbGuideMapData[index].like_user = newData;
        break;
      default:
        console.log("none");
    }

    updateGuideMapDB(...props.dbGuideMapData);
  };

  const removeUserMapDB = (removeValue, column) => {
    let updateMapArr = [];
    let patchMapData = [];
    let patchUserData = [];

    switch (column) {
      case "MAP_LIKE":
        updateMapArr = getMapDBByLocationId(removeValue)
          .like_user.filter((user) => user !== state.username);

        patchMapData = {
          like_user: updateMapArr,
        };

        patchUserData = {
          map_like: userData.map_like.filter((id) => id !== removeValue),
        };
        break;
    }

    patchGuidemapApi(removeValue, patchMapData)
      .then((res) => {
        updateMapDBByLocationId(removeValue, updateMapArr, "LIKE");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    patchUserApi(state.username, patchUserData)
      .then((res) => {
        setUserdata(patchUserData);
        handleShowAlertOpen();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const getFriendsGroupDBById = (groupId) => {
    console.log(groupId)
    if (dbFriendsGroupData != undefined) {
      return dbFriendsGroupData.find(
        (data) => data.group_id === groupId
      );
    } else {
      return null;
    }
  };

  const updateFriendsGroupDBById = (group_id, newData, type) => {
    let index = dbFriendsGroupData.findIndex(
      (data) => data.group_id === group_id
    );

    switch (type) {
      case "JOIN":
        dbFriendsGroupData[index].join_user = newData;
        break;
      case "LIKE":
        dbFriendsGroupData[index].possible_user = newData;
        break;
      default:
        console.log("none");
    }
    updateFriendsGroupDB([...dbFriendsGroupData]);
  };

  const removeUserGroupDB = (removeValue, column) => {
    let updateGroupArr = [];
    let patchGroupData = [];
    let patchUserData = [];
    let type = "";

    switch (column) {
      case "GROUP_JOIN":
        updateGroupArr = getFriendsGroupDBById(removeValue)
          .join_user.filter((user) => user !== state.username);

        patchGroupData = {
          join_user: updateGroupArr,
        };

        patchUserData = {
          group_join: userData.group_join.filter((id) => id !== removeValue),
        };

        type = "JOIN";

        break;

      case "GROUP_LIKE":
        console.log(getFriendsGroupDBById(removeValue))
        updateGroupArr = getFriendsGroupDBById(removeValue)
          .possible_user.filter((user) => user !== state.username);

        patchGroupData = {
          possible_user: updateGroupArr,
        };

        patchUserData = {
          group_like: userData.group_like.filter((id) => id !== removeValue),
        };
        console.log(updateGroupArr)
        console.log(patchUserData)
        type = "LIKE";

        break;
    }

    patchFriendsGroupApi(removeValue, patchGroupData)
      .then((res) => {
        updateFriendsGroupDBById(removeValue, updateGroupArr, type);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    patchUserApi(state.username, patchUserData)
      .then((res) => {
        setUserdata(patchUserData);
        handleShowAlertOpen();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
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

  const [dbGuideMapData, setDbGuideMapData] = useState([]);

  const updateGuideMapDB = (newData) => {
    setDbGuideMapData([...dbGuideMapData, newData]);
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
    getGuidemapApi()
      .then((res) => {
        setDbGuideMapData(...dbGuideMapData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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
            <span
              style={{
                marginLeft: 20,
                fontFamily: "Galindo",
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: 28,
                fontWeight: 900,
              }}
            >
              SkateboardGO
            </span>
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
            {state.isAuthenticated && (
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
              dbGuideMapData={dbGuideMapData}
              updateGuideMapDB={updateGuideMapDB}
              dbFriendsGroupData={dbFriendsGroupData}
              updateGroupUserDB={updateGroupUserDB}
              //removeUserDB={removeUserDB}
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
              //removeUserDB={removeUserDB}
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
              dbGuideMapData={dbGuideMapData}
              removeUserMapDB={removeUserMapDB}
              removeUserGroupDB={removeUserGroupDB}
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

        <Route
          exact
          path={"/friendsGroupDetail/:id"}
          key={"route-friendsGroupDetail"}
          //children={<FriendsGroupDetail />}
          render={() => (
            <FriendsGroupDetail
            //userData={props.userData}
            // dbFriendsGroupData={dbFriendsGroupData}
            />
          )}
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
