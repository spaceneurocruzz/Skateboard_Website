import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import {
  getUserApi,
  patchUserApi,
  getGuidemapApi,
  getFriendsGroupApi,
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

import indexmanstand from "../imgs/indexmanstand.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      fontSize: "20px",
      // width: "25ch",
    },
  },
  button: {
    // color: blue[900],
    margin: 10,
    paddingTop: 20,
  },
  input: {
    display: "none",
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    "&:hover": {
      color: red[800],
    },
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

const User = (props) => {
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(AuthContext);
  const [img, setImg] = useState({
    mainState: "initial",
    selectedFile: null,
    imageUploaded: 0,
  });
  const [dbGuideMapData, setDbGuideMapData] = useState([]);
  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const localUsername = localStorage.getItem("username");

  // if (accessToken && refreshToken) {
  //   dispatch({
  //     type: "LOGIN",
  //     payload: {
  //       access: accessToken,
  //       refresh: refreshToken,
  //       username: localUsername,
  //     },
  //   });
  // }

  // useEffect(() => {
  //   getUserApi(localUsername)
  //     .then((res) => {
  //       console.table(res.data);
  //       props.initUserDB(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response);
  //     })
  //     .finally(() => {});
  // }, []);

  // useEffect(() => {
  //   getGuidemapApi()
  //     .then((res) => {
  //       setDbGuideMapData(...dbGuideMapData, res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => {});
  // }, []);

  // useEffect(() => {
  //   getFriendsGroupApi()
  //     .then((res) => {
  //       for (let ix in res.data) {
  //         res.data[ix]["group_startdt"] = `${res.data[ix].group_startdt.slice(
  //           0,
  //           10
  //         )}  ${res.data[ix].group_startdt.slice(11, 19)}`;
  //       }

  //       setDbFriendsGroupData(...dbFriendsGroupData, res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response);
  //     })
  //     .finally(() => {});
  // }, []);

  let holdEvent = [];
  if (props.dbFriendsGroupData != undefined) {
    holdEvent = props.dbFriendsGroupData.filter(
      (group) => group.create_user == state.username
    );
  } else if (dbFriendsGroupData != undefined) {
    holdEvent = dbFriendsGroupData.filter(
      (group) => group.create_user == state.username
    );
    console.log(state.username);
  }

  const [openMap, setOpenMap] = React.useState(false);
  const [openActivity, setOpenActivity] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState(false);
  const [openArticle, setOpenArticle] = React.useState(false);

  const handleMapClick = () => {
    setOpenMap(!openMap);
  };
  const handleActivityClick = () => {
    setOpenActivity(!openActivity);
  };
  const handleGroupClick = () => {
    setOpenGroup(!openGroup);
  };
  const handleArticleClick = () => {
    setOpenArticle(!openArticle);
  };

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

  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    props.updateUserDB(event.target);

    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  }; 
  const [userData, setUserdata] = useState([]);


  useEffect(() => {
    getUserApi(state.username)
      .then((res) => {
        console.table(res.data);
        setUserdata(res.data);
        //setDbdata(res.data);
        //console.table(dbData);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

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
    console.table("submit");
    patchUserApi(state.username, userData)
      .then((res) => {
        handleShowAlertOpen();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Typography>{children}</Typography>
            </Box>
          </Container>
        )}
      </div>
    );
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const TabInfo = () => {
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
          {/* <AppBar position="static"> */}
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
          </Tabs>
          {/* </AppBar> */}
          <TabPanel value={value} index={0}>
            <Grid container>
              <EditLocationIcon />
              <b>
                <div style={{ marginBottom: 10 }}>新增地點 :</div>
              </b>
              <ul>
                {userData.map_add != undefined ||
                userData.map_add != null ? (
                  userData.map_add.map((addId, index) => {
                    let data = null;
                    if (
                      props.dbGuideMapData != undefined ||
                      props.dbGuideMapData != null
                    ) {
                      data = props.dbGuideMapData.find(
                        (map) => map.location_id == addId
                      );
                    } else if (dbGuideMapData != undefined) {
                      data = dbGuideMapData.find(
                        (map) => map.location_id == addId
                      );
                    }
                    return (
                      <li style={{ listStyleType: "decimal" }}>
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
                {userData.map_like != undefined ||
                userData.map_like != null ? (
                  userData.map_like.map((likeId, index) => {
                    let data = [];
                    if (
                      props.dbGuideMapData != undefined ||
                      props.dbGuideMapData != null
                    ) {
                      data = props.dbGuideMapData.find(
                        (map) => map.location_id == likeId
                      );
                    } else if (dbGuideMapData != undefined) {
                      data = dbGuideMapData.find(
                        (map) => map.location_id == likeId
                      );
                    }
                    return (
                      <li style={{ listStyleType: "decimal" }}>
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
          <TabPanel value={value} index={1}>
            <Grid container>
              <b>
                <EmojiEventsIcon />
                舉辦中 :
              </b>
              <ul>
                {holdEvent != undefined || holdEvent != null ? (
                  holdEvent.map((data, index) => {
                    return (
                      <li style={{ listStyleType: "decimal" }}>
                        {data.group_startdt.slice(0, 10)}{" "}
                        {data.group_startdt.slice(11, 20)} 在{" "}
                        {data.location_name}
                        (ID:{" "}
                        <NavLink
                          to={"/friendsGroupDetail/" + data.group_id}
                          className="userLink"
                        >
                          {data.group_id}
                        </NavLink>
                        )
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
                {userData.group_join != undefined ||
                userData.group_join != null ? (
                  userData.group_join.map((joinId, index) => {
                    let data = props.dbFriendsGroupData.find(
                      (group) => group.group_id == joinId
                    );
                    return (
                      <li style={{ listStyleType: "decimal" }}>
                        {data.group_startdt.slice(0, 10)}{" "}
                        {data.group_startdt.slice(11, 20)} 在{" "}
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
                {userData.group_like != undefined ||
                userData.group_like != null ? (
                  userData.group_like.map((likeId, index) => {
                    let data = props.dbFriendsGroupData.find(
                      (group) => group.group_id == likeId
                    );
                    return (
                      <li style={{ listStyleType: "decimal" }}>
                        {data.group_startdt.slice(0, 10)}{" "}
                        {data.group_startdt.slice(11, 20)} 在{" "}
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
                  })
                ) : (
                  <span>還沒有</span>
                )}
              </ul>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EditProfile />
          </TabPanel>
        </div>
        {/* <div style={{marginLeft:40}}>
          <img
            src={indexmanstand}
            style={{
              height: 500,
              width: "auto",
              marginBottom: 70,
            }}
            alt="banner"
          />
        </div> */}
      </Grid>
    );
  };

  const EditProfile = () => {
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container>
          <TextField
            disabled
            id="filled-disabled"
            label="帳號"
            defaultValue={state.username}
            variant="filled"
          />
          <TextField
            onChange={handleInputChange}
            id="filled-password-input"
            label="密碼"
            type="password"
            value={password}
            autoComplete="current-password"
            variant="filled"
          />
        </Grid>
        <Grid container>
          <TextField
            onChange={handleInputChange}
            required
            id="filled-required-email"
            name="email"
            label="Email(必填)"
            value={userData.email}
            variant="filled"
            style={{ width: 300 }}
          />
        </Grid>
        <Grid container>
          <TextField
            onChange={handleInputChange}
            required
            id="filled-required"
            name="nickname"
            label="暱稱"
            value={userData.nickname}
            variant="filled"
          />
          <TextField
            onChange={handleInputChange}
            id="filled-search"
            label="所在城市"
            name="location"
            value={userData.location}
            variant="filled"
          />
        </Grid>

        <Grid container>
          <TextField
            onChange={handleInputChange}
            id="filled-multiline-static"
            label="自我介紹"
            name="intro"
            multiline
            style={{ width: 400 }}
            rows={5}
            value={userData.intro}
            variant="filled"
          />
        </Grid>

        <Button
          onClick={handleSubmit}
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

  return (
    <>
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} />
      <ShowAlertErrorMessages
        open={openShowErrorAlert}
        onClose={handleShowErrorAlertClose}
      />

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
            src={`https://ui-avatars.com/api/?name=${state.username}&size=128&rounded=true&background=040404&color=fff`}
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
            <h2>暱稱：{userData.nickname}</h2>
            <div style={{ display: "flex" }}>
              <span>@{state.username}</span>
              <span></span>
            </div>
          </div>
          {/* <span style={{fontSize:24, verticalAlign:"middle"}}>{state.username}</span> */}
        </Grid>

        <TabInfo />
      </Container>
    </>
  );
};

export default User;
