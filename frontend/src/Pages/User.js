import React, { useState, useEffect } from "react";
import { getUserApi, patchUserApi } from "../axiosApi";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../App";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { eachDayOfInterval } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
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

  // const initialState = {
  //   nickname: "",
  //   email: "",
  //   location: "",
  //   intro: "",
  //   avatar: "",
  // };

  // const [dbData, setDbdata] = useState(initialState);
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    console.log(event.target.name);
    props.updateUserDB(event.target);
    // setDbdata({
    //   ...dbData,
    //   [event.target.name]: event.target.value,
    // });
    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  };

  useEffect(() => {
    getUserApi(state.username)
      .then((res) => {
        console.table(res.data);
        props.initUserDB(res.data);
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
    console.log(props.userData);
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
    console.log();
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setImg({
        selectedFile: [reader.result],
      });
      console.log(img.selectedFile);
      console.log([reader.result]);
    };
    // url = reader.readAsDataURL(file)

    setImg({
      mainState: "uploaded",
      selectedFile: file,
      imageUploaded: 1,
    });

    console.log(img);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(img);
    patchUserApi(state.username, props.userData)
      .then((res) => {
        console.table(userData);
        console.table(res.data);
        alert("更新成功！");
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
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
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
      <Grid container>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="地圖" {...a11yProps(0)} />
            <Tab label="揪團" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            新增地點 :
            <ul>
              {props.userData.map_add != undefined ||
              props.userData.map_add != null ? (
                props.userData.map_add.map((addId, index) => {
                  let data = props.dbGuideMapData.find(
                    (map) => map.location_id == addId
                  );
                  return (
                    <li>
                      {data.location_name} {data.address}
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ul>
          </div>
          <div>
            收藏地點:
            <ul>
              {props.userData.map_like != undefined ||
              props.userData.map_like != null ? (
                props.userData.map_like.map((likeId, index) => {
                  let data = props.dbGuideMapData.find(
                    (group) => group.group_id == likeId
                  );
                  return (
                    <li>
                      {data.location_name} {data.address}
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            參加中:
            <ul>
              {props.userData.group_join != undefined ||
              props.userData.group_join != null ? (
                props.userData.group_join.map((joinId, index) => {
                  let data = props.dbFriendsGroupData.find(
                    (group) => group.group_id == joinId
                  );
                  return (
                    <li>
                      {data.group_startdt.slice(0, 10)}{" "}
                      {data.group_startdt.slice(11, 20)} 在 {data.location_name}
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ul>
          </div>
          <div>
            追蹤中:
            <ul>
              {props.userData.group_like != undefined ||
              props.userData.group_like != null ? (
                props.userData.group_like.map((likeId, index) => {
                  let data = props.dbFriendsGroupData.find(
                    (group) => group.group_id == likeId
                  );
                  return (
                    <li>
                      {data.group_startdt.slice(0, 10)}{" "}
                      {data.group_startdt.slice(11, 20)} 在 {data.location_name}
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </TabPanel>
      </Grid>
    );
  };

  return (
    <Container component="main" maxWidth="md">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <Grid container>
            <input
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
            </label>
            <img
              width="200px"
              className={classes.media}
              src={img.selectedFile}
            />
            {/* <img
              width="200px"
              className={classes.media}
              src={`../..${props.userData.avatar}`}
            /> */}
            <Button
              onClick={handleAvatarSubmit}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              確認
            </Button>
          </Grid>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
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
            <TextField
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
              id="filled-required"
              name="nickname"
              label="暱稱"
              value={props.userData.nickname}
              variant="filled"
            />
            <TextField
              onChange={handleInputChange}
              id="filled-search"
              label="所在城市"
              name="location"
              value={props.userData.location}
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
              fullWidth
              rows={8}
              value={props.userData.intro}
              variant="filled"
            />
          </Grid>
          <TabInfo />
        </div>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          確認修改
        </Button>
      </form>
    </Container>
  );
};

export default User;
