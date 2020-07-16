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

const User = () => {
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(AuthContext);
  const [img, setImg] = useState({
    mainState: "initial",
    selectedFile: null,
    imageUploaded: 0,
  });
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const initialState = {
    nickname: "",
    email: "",
    location: "",
    intro: "",
    avatar: "",
  };

  const [dbData, setDbdata] = useState(initialState);
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    setDbdata({
      ...dbData,
      [event.target.name]: event.target.value,
    });
    if (event.target.name == "password") {
      setPassword(event.target.value);
    }
  };

  useEffect(() => {
    getUserApi(state.username)
      .then((res) => {
        console.table(res.data);
        setDbdata(res.data);
        console.table(dbData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    console.log(img);
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
    patchUserApi(state.username, dbData)
      .then((res) => {
        console.table(dbData);
        console.table(res.data);
        alert("更新成功！");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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
            <img
              width="200px"
              className={classes.media}
              src={`../..${dbData.avatar}`}
            />
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
              id="filled-required"
              name="email"
              label="Email(必填)"
              value={dbData.email}
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
              value={dbData.nickname}
              variant="filled"
            />
            <TextField
              onChange={handleInputChange}
              id="filled-search"
              label="所在城市"
              name="location"
              value={dbData.location}
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
              value={dbData.intro}
              variant="filled"
            />
          </Grid>
          <Grid container>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="地圖" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我喜愛的地點" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我新增的地圖" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我評論過的地點" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="活動" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我收藏的活動" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我發表過的活動" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="揪團" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我參與的滑板團" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="文章" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我收藏的文章" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="我發表的文章" />
                </ListItem>
              </List>
            </Collapse>
          </Grid>
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
