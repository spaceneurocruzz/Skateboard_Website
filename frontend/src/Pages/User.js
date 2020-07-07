import React, { useState, useEffect } from "react";
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
import axiosInstance from "../axiosApi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    // color: blue[900],
    margin: 10,
  },
  input: {
    display: "none",
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800],
    },
  },
}));

const User = () => {
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);
  const { dispatch } = React.useContext(AuthContext);
  const [img, setImg] = useState({});

  const initialState = {
    nickname: "",
    email: "",
    location: "",
    intro: "",
    avatar:"",
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

    console.log(dbData);
  };

  useEffect(() => {
    axios
      .get(`api/user/get/username=${state.username}`)
      .then((res) => {
        console.table(res.data);
        setDbdata(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const handleAvatarSubmit = (event) => {
    let form_data = new FormData();
    form_data.append("image", img);
    form_data.append("title", state.username);
    form_data.append("content", state.username);
    //form_data.append("_method", 'PATCH');
    console.log(form_data)
    axios
      .patch(`api/user/update/username=${state.username}`, form_data, {
        headers: {
          "content-type": "multipart/form-data"
          //"application/x-www-form-urlencoded"  
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImg({
        selectedFile: [reader.result],
      });
    }.bind(this);
    console.log(url); // Would see a path?

    setImg({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`api/user/update/username=${state.username}`, dbData)
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
      個人資料
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
              name="nickname"
              label="暱稱"
              value={dbData.nickname}
              variant="filled"
            />
            <TextField
              onChange={handleInputChange}
              required
              id="filled-required"
              name="email"
              label="Email(必填)"
              value={dbData.email}
              // defaultValue=""
              variant="filled"
            />
            <TextField
              onChange={handleInputChange}
              id="filled-search"
              label="所在城市"
              name="location"
              //defaultValue={dbData.location}
              value={dbData.location}
              variant="filled"
            />
            <TextField
              onChange={handleInputChange}
              id="filled-multiline-static"
              label="自我介紹"
              name="intro"
              multiline
              rows={10}
              // defaultValue=""
              value={dbData.intro}
              variant="filled"
            />
            {/* <TextField
            id="filled-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          /> */}
            {/* <TextField
            id="filled-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
          />
          <TextField
            id="filled-helperText"
            label="Helper text"
            defaultValue="Default Value"
            helperText="Some important text"
            variant="filled"
          /> */}
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
