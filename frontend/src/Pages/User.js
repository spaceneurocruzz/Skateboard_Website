import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import {
  getUserApi,
  patchUserApi,
  getGuidemapApi,
  getFriendsGroupApi,
  patchFriendsGroupApi,
  patchGuidemapApi,
} from "../axiosApi";
import { AuthContext } from "../App";
import ShowAlertMessages from "../Components/ShowAlertMessages";
import ShowAlertErrorMessages from "../Components/ShowAlertErrorMessages";

import "../css/app.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      fontSize: "20px",
    },
  },
  button: {
    margin: 10,
    paddingTop: 20,
  },
  input: {
    display: "none",
  },
  tab: {
    fontSize: "16px",
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabroot: {
    fontSize: "16px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 500,
  },
}));

const TabPanel = (props) => {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box p={3}>
            <Typography component="div">{children}</Typography>
          </Box>
        </Container>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabInfo = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!props.isGuidemapLoaded || !props.isFriendsLoaded) {
    return <div>Loading...</div>;
  } else {
    const filterNewData = (data) => new Date(data.group_startdt) >= new Date();
    const filterOldData = (data) => new Date(data.group_startdt) < new Date();

    let newHoldEvent = [];
    let oldHoldEvent = [];
    let newJoinEvent = [];
    let oldJoinEvent = [];
    let newTrackEvent = [];
    let oldTrackEvent = [];
    if (props.dbFriendsGroupData != undefined) {
      let userEvent = props.dbFriendsGroupData.filter(
        (group) => group.create_user == props.userData.username
      );
      newHoldEvent = userEvent.filter(filterNewData);
      oldHoldEvent = userEvent.filter(filterOldData);
    }

    return (
      <Grid
        container
        style={{
          width: "90%",
          marginBottom: 50,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className={classes.tabroot} style={{ display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="地圖" {...a11yProps(0)} className={classes.tab} />
            <Tab label="揪團" {...a11yProps(1)} className={classes.tab} />
            <Tab
              label="修改個人資料"
              {...a11yProps(2)}
              className={classes.tab}
            />
            <Tab label="歷史紀錄" {...a11yProps(2)} className={classes.tab} />
          </Tabs>

          <TabPanel value={value} index={0} key={0}>
            <Grid container>
              <EditLocationIcon />
              <b>
                <span style={{ marginBottom: 10 }}>新增地點 :</span>
              </b>
              <ul>
                {props.userData.map_add != undefined ||
                props.userData.map_add != null ? (
                  props.userData.map_add.map((addId, index) => {
                    let data = null;
                    if (
                      props.dbGuideMapData != undefined ||
                      props.dbGuideMapData != null
                    ) {
                      data = props.dbGuideMapData.find(
                        (map) => map.location_id == addId
                      );
                    } else if (props.dbGuideMapData != undefined) {
                      data = props.dbGuideMapData.find(
                        (map) => map.location_id == addId
                      );
                    }
                    return (
                      <li
                        key={data.location_id}
                        style={{ listStyleType: "decimal" }}
                      >
                        {data.location_type} {data.location_name}:{" "}
                        {data.address}
                      </li>
                    );
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
            <Grid container>
              <b>
                <FavoriteIcon />
                <span>最愛地點 :</span>
              </b>
              <ul>
                {props.userData.map_like != undefined ||
                props.userData.map_like != null ? (
                  props.userData.map_like.map((likeId, index) => {
                    let data = [];
                    if (
                      props.dbGuideMapData != undefined ||
                      props.dbGuideMapData != null
                    ) {
                      data = props.dbGuideMapData.find(
                        (map) => map.location_id == likeId
                      );
                    }
                    return (
                      <li
                        key={data.location_id}
                        style={{ listStyleType: "decimal" }}
                      >
                        {data.location_type} {data.location_name}:{" "}
                        <a
                          href={
                            "https://www.google.com/maps/dir/?api=1&destination=" +
                            data.address
                          }
                          className="addressLink"
                        >
                          {data.address}
                        </a>
                        <DeleteForeverIcon
                          style={{ verticalAlign: "middle" }}
                          onClick={() =>
                            props.removeUserMapDB(data.location_id, "MAP_LIKE")
                          }
                        />
                      </li>
                    );
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} key={1}>
            <Grid container>
              <b>
                <EmojiEventsIcon />
                舉辦中 :
              </b>
              <ul>
                {newHoldEvent != undefined || newHoldEvent != null ? (
                  newHoldEvent.map((data, index) => {
                    return (
                      <li
                        key={data.group_id}
                        style={{ listStyleType: "decimal" }}
                      >
                        {data.group_startdt.slice(0, 10)}{" "}
                        {data.group_startdt.slice(11, 19)} 在{" "}
                        {data.location_name}
                        (ID:{" "}
                        <NavLink
                          to={"/friendsGroupDetail/" + data.group_id}
                          className="userLink"
                        >
                          {data.group_id}
                        </NavLink>
                        )<span>[參加人數: {data.join_user.length}]</span>
                      </li>
                    );
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
            <Grid container>
              <b>
                <EventAvailableIcon />
                參加中 :
              </b>
              <ul>
                {props.userData.group_join != undefined ||
                props.userData.group_join != null ? (
                  props.userData.group_join.map((joinId, index) => {
                    let data = props.dbFriendsGroupData.filter(
                      (group) =>
                        group.group_id == joinId &&
                        new Date(group.group_startdt) >= new Date()
                    )[0];
                    if (data != undefined) {
                      return (
                        <li
                          key={data.group_id}
                          style={{ listStyleType: "decimal" }}
                        >
                          {data.group_startdt.slice(0, 10)}{" "}
                          {data.group_startdt.slice(11, 19)} 在{" "}
                          {data.location_name}
                          (ID:{" "}
                          <NavLink
                            to={"/friendsGroupDetail/" + data.group_id}
                            className="userLink"
                          >
                            {data.group_id}
                          </NavLink>
                          )
                          <DeleteForeverIcon
                            style={{ verticalAlign: "middle" }}
                            onClick={() =>
                              props.removeUserGroupDB(
                                data.group_id,
                                "GROUP_JOIN"
                              )
                            }
                          />
                        </li>
                      );
                    }
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
            <Grid container>
              <b>
                <TrackChangesIcon />
                追蹤中 :
              </b>
              <ul>
                {props.userData.group_like != undefined ||
                props.userData.group_like != null ? (
                  props.userData.group_like.map((likeId, index) => {
                    let data = props.dbFriendsGroupData.filter(
                      (group) =>
                        group.group_id == likeId &&
                        new Date(group.group_startdt) >= new Date()
                    )[0];
                    if (data != undefined) {
                      return (
                        <li
                          key={data.group_id}
                          style={{ listStyleType: "decimal" }}
                        >
                          {data.group_startdt.slice(0, 10)}{" "}
                          {data.group_startdt.slice(11, 19)} 在{" "}
                          {data.location_name}
                          (ID:{" "}
                          <NavLink
                            to={"/friendsGroupDetail/" + data.group_id}
                            className="userLink"
                          >
                            {data.group_id}
                          </NavLink>
                          )
                          <DeleteForeverIcon
                            style={{ verticalAlign: "middle" }}
                            onClick={() =>
                              props.removeUserGroupDB(
                                data.group_id,
                                "GROUP_LIKE"
                              )
                            }
                          />
                        </li>
                      );
                    }
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2} key={2}>
            <EditProfile
              userData={props.userData}
              handleSubmit={props.handleSubmit}
              handleInputChange={props.handleInputChange}
            />
          </TabPanel>
          <TabPanel value={value} index={3} key={3}>
            <Grid container>
              <b>
                <EmojiEventsIcon />
                過期舉辦 :
              </b>
              <ul>
                {oldHoldEvent != undefined || oldHoldEvent != null ? (
                  oldHoldEvent.map((data, index) => {
                    return (
                      <li
                        key={data.group_id}
                        style={{ listStyleType: "decimal" }}
                      >
                        {data.group_startdt.slice(0, 10)}{" "}
                        {data.group_startdt.slice(11, 19)} 在{" "}
                        {data.location_name}
                        (ID:{" "}
                        <NavLink
                          to={"/friendsGroupDetail/" + data.group_id}
                          className="userLink"
                        >
                          {data.group_id}
                        </NavLink>
                        )<span>[參加人數: {data.join_user.length}]</span>
                      </li>
                    );
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
            <Grid container>
              <b>
                <EventAvailableIcon />
                過期參加 :
              </b>
              <ul>
                {props.userData.group_join != undefined ||
                props.userData.group_join != null ? (
                  props.userData.group_join.map((joinId, index) => {
                    let data = props.dbFriendsGroupData.filter(
                      (group) =>
                        group.group_id == joinId &&
                        new Date(group.group_startdt) < new Date()
                    )[0];
                    if (data != undefined) {
                      return (
                        <li
                          key={data.group_id}
                          style={{ listStyleType: "decimal" }}
                        >
                          {data.group_startdt.slice(0, 10)}{" "}
                          {data.group_startdt.slice(11, 19)} 在{" "}
                          {data.location_name}
                          (ID:{" "}
                          <NavLink
                            to={"/friendsGroupDetail/" + data.group_id}
                            className="userLink"
                          >
                            {data.group_id}
                          </NavLink>
                          )
                          <DeleteForeverIcon
                            style={{ verticalAlign: "middle" }}
                            onClick={() =>
                              props.removeUserGroupDB(
                                data.group_id,
                                "GROUP_JOIN"
                              )
                            }
                          />
                        </li>
                      );
                    }
                  })
                ) : (
                  <span>沒有</span>
                )}
              </ul>
            </Grid>
            <Grid container>
              <b>
                <TrackChangesIcon />
                過期追蹤 :
              </b>
              <ul>
                {props.userData.group_like != undefined ||
                props.userData.group_like != null ? (
                  props.userData.group_like.map((likeId, index) => {
                    let data = props.dbFriendsGroupData.filter(
                      (group) =>
                        group.group_id == likeId &&
                        new Date(group.group_startdt) < new Date()
                    )[0];
                    if (data != undefined) {
                      return (
                        <li
                          key={data.group_id}
                          style={{ listStyleType: "decimal" }}
                        >
                          {data.group_startdt.slice(0, 10)}{" "}
                          {data.group_startdt.slice(11, 19)} 在{" "}
                          {data.location_name}
                          (ID:{" "}
                          <NavLink
                            to={"/friendsGroupDetail/" + data.group_id}
                            className="userLink"
                          >
                            {data.group_id}
                          </NavLink>
                          )
                          <DeleteForeverIcon
                            style={{ verticalAlign: "middle" }}
                            onClick={() =>
                              removeUserGroupDB(data.group_id, "GROUP_LIKE")
                            }
                          />
                        </li>
                      );
                    }
                  })
                ) : (
                  <span>沒有</span>
                )}
              </ul>
            </Grid>
          </TabPanel>
        </div>
      </Grid>
    );
  }
};

const EditProfile = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container>
        <TextField
          disabled
          id="filled-disabled"
          label="帳號"
          defaultValue={props.userData.username}
          variant="filled"
        />
        <TextField
          onChange={props.handleInputChange}
          id="filled-password-input"
          label="密碼"
          name="password"
          type="password"
          value={props.userData.password}
          // autoComplete="current-password"
          variant="filled"
        />
      </Grid>
      <Grid container>
        <TextField
          onChange={props.handleInputChange}
          required
          id="filled-required-email"
          name="email"
          label="Email(必填)"
          value={props.userData.email}
          variant="filled"
          style={{ width: 300 }}
        />
      </Grid>
      <Grid container>
        <TextField
          onChange={props.handleInputChange}
          required
          id="filled-required"
          name="nickname"
          label="暱稱"
          value={props.userData.nickname}
          variant="filled"
        />
        <TextField
          onChange={props.handleInputChange}
          id="filled-search"
          label="所在城市"
          name="location"
          value={props.userData.location}
          variant="filled"
        />
      </Grid>

      <Grid container>
        <TextField
          onChange={props.handleInputChange}
          id="filled-multiline-static"
          label="自我介紹"
          name="intro"
          multiline
          style={{ width: 400 }}
          rows={5}
          value={props.userData.intro}
          variant="filled"
        />
      </Grid>

      <Button
        onClick={props.handleSubmit}
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        style={{ marginLeft: 5 }}
      >
        確認修改
      </Button>
    </form>
  );
};

const UserDetail = (props) => {
  return (
    <Container
      className="user_conatainer"
      component="main"
      maxWidth="lg"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Grid
        container
        style={{ marginTop: 70, marginBottom: 20, display: "flex" }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${props.userData.username}&size=128&rounded=true&background=040404&color=fff`}
        />
        {/* <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          name="avatar"
          multiple
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classes.button}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label> */}
        {/* <img
          width="200px"
          className={classes.media}
          src={img.selectedFile}
        /> */}
        {/* <img
          width="200px"
          className={classes.media}
          src={`../..${props.userData.avatar}`}
        /> */}
        {/* <Button
          onClick={handleAvatarSubmit}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          確認
        </Button> */}
        {/* <div style={{ fontSize: 28, marginLeft: 50 }}>nickname</div>
      <div style={{ fontSize: 28, marginLeft: 50 }}>username</div> */}
        <div style={{ marginLeft: 50 }}>
          <h2>暱稱：{props.userData.nickname}</h2>
          <div style={{ display: "flex" }}>
            <span>@{props.userData.username}</span>
            <span></span>
          </div>
        </div>
      </Grid>
      <TabInfo
        userData={props.userData}
        dbGuideMapData={props.dbGuideMapData}
        dbFriendsGroupData={props.dbFriendsGroupData}
        removeUserGroupDB={props.removeUserGroupDB}
        isGuidemapLoaded={props.isGuidemapLoaded}
        isFriendsLoaded={props.isFriendsLoaded}
        handleSubmit={props.handleSubmit}
        handleInputChange={props.handleInputChange}
        removeUserMapDB={props.removeUserMapDB}
        removeUserGroupDB={props.removeUserGroupDB}
      />
    </Container>
  );
};

const User = (props) => {
  const { state } = React.useContext(AuthContext);
  const [img, setImg] = useState({
    mainState: "initial",
    selectedFile: null,
    imageUploaded: 0,
  });

  const [openShowAlert, setOpenShowAlert] = React.useState(false);

  const handleShowAlertOpen = () => {
    setOpenShowAlert(true);
  };

  const handleShowAlertClose = () => {
    setOpenShowAlert(false);
  };

  const [openShowErrorAlert, setOpenShowErrorAlert] = React.useState(false);

  const handleShowErrorAlertOpen = () => {
    setOpenShowErrorAlert(true);
  };

  const handleShowErrorAlertClose = () => {
    setOpenShowErrorAlert(false);
  };

  const handleInputChange = (event) => {
    props.updateUserDB(event.target);
  };

  const [isDataChanged, setIsDataChanged] = useState(false);

  if (state.username == null) {
    useEffect(() => {
      getUserApi(localStorage.getItem("username"))
        .then((res) => {
          props.initUserDB(res.data);
        })
        .then(() => {
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {});
    }, [isDataChanged]);
  } else {
    useEffect(() => {
      getUserApi(state.username)
        .then((res) => {
          props.initUserDB(res.data);
        })
        .then(() => {
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {});
    }, [isDataChanged]);
  }

  const [dbGuideMapData, setDbGuideMapData] = useState([]);
  const [isGuidemapLoaded, setIsGuidemapLoaded] = useState(false);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        setDbGuideMapData(res.data);
      })
      .then((res) => {
        setIsGuidemapLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);
  const [isFriendsLoaded, setIsFriendsLoaded] = useState(false);

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        setDbFriendsGroupData(res.data);
      })
      .then((res) => {
        setIsFriendsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const getMapDBByLocationId = (locationId) => {
    if (dbGuideMapData != undefined) {
      return dbGuideMapData.find((data) => data.location_id === locationId);
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

    setDbGuideMapData(dbGuideMapData);
  };

  const removeUserMapDB = (removeValue, column) => {
    let updateMapArr = [];
    let patchMapData = [];
    let patchUserData = [];

    switch (column) {
      case "MAP_LIKE":
        updateMapArr = getMapDBByLocationId(removeValue).like_user.filter(
          (user) => user !== state.username
        );

        patchMapData = {
          like_user: updateMapArr,
        };

        patchUserData = {
          map_like: props.userData.map_like.filter((id) => id !== removeValue),
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
        props.updateGroupUserDB(patchUserData);
        handleShowAlertOpen();
      })
      .then(() => {
        setIsDataChanged(true);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const getFriendsGroupDBById = (groupId) => {
    if (dbFriendsGroupData != undefined) {
      return dbFriendsGroupData.find((data) => data.group_id === groupId);
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
    setDbFriendsGroupData(dbFriendsGroupData);
  };

  const removeUserGroupDB = (removeValue, column) => {
    let updateGroupArr = [];
    let patchGroupData = [];
    let patchUserData = [];
    let type = "";

    switch (column) {
      case "GROUP_JOIN":
        updateGroupArr = getFriendsGroupDBById(removeValue).join_user.filter(
          (user) => user !== state.username
        );

        patchGroupData = {
          join_user: updateGroupArr,
        };

        patchUserData = {
          group_join: props.userData.group_join.filter(
            (id) => id !== removeValue
          ),
        };

        type = "JOIN";

        break;

      case "GROUP_LIKE":
        updateGroupArr = getFriendsGroupDBById(
          removeValue
        ).possible_user.filter((user) => user !== state.username);

        patchGroupData = {
          possible_user: updateGroupArr,
        };

        patchUserData = {
          group_like: props.userData.group_like.filter(
            (id) => id !== removeValue
          ),
        };
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
        props.updateGroupUserDB(patchUserData);
        handleShowAlertOpen();
      })
      .then(() => {
        setIsDataChanged(true);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append("image", img.selectedFile[0]);
    // form_data.append("title", state.username);
    // form_data.append("content", state.username);
    //form_data.append("_method", 'PATCH');

    // axios
    //   .patch(`api/user/update/username=${state.username}`, form_data, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //       //"application/x-www-form-urlencoded"
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(img.selectedFile[0]);
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleUploadClick = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImg({
        selectedFile: [reader.result],
      });
    };
    // url = reader.readAsDataURL(file)

    setImg({
      mainState: "uploaded",
      selectedFile: file,
      imageUploaded: 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(props.userData);
    patchUserApi(state.username, props.userData)
      .then((res) => {
        handleShowAlertOpen();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  return (
    <>
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} />
      <ShowAlertErrorMessages
        open={openShowErrorAlert}
        onClose={handleShowErrorAlertClose}
      />
      <UserDetail
        userData={props.userData}
        dbGuideMapData={dbGuideMapData}
        dbFriendsGroupData={dbFriendsGroupData}
        isGuidemapLoaded={isGuidemapLoaded}
        isFriendsLoaded={isFriendsLoaded}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        removeUserMapDB={removeUserMapDB}
        removeUserGroupDB={removeUserGroupDB}
      />
    </>
  );
};

export default User;
