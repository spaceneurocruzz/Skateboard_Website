import React from "react";
import { Switch, Route, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { userSignupApi } from "../axiosApi";
import "../css/app.css";
import Login from "./Login";
import ShowAlertMessages from "../Components/ShowAlertMessages";
import ShowAlertErrorMessages from "../Components/ShowAlertErrorMessages";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  back: {
    backgroundColor: "#fcf3ea",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    background: {
      default: "#fcf3ea",
    },
  },
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  const [openShowAlert, setOpenShowAlert] = React.useState(false);

  const handleShowAlertOpen = () => {
    setOpenShowAlert(true);
  };

  const handleShowAlertClose = () => {
    setOpenShowAlert(false);
  };

  const initialState = {
    username: "",
    password: "",
    email: "",
    errorMsg: {},
    isUsernameFilled: true,
    isEmailFilled: true,
    isPasswordValid: true,
  };

  const [authData, setAuthData] = React.useState(initialState);

  const handleInputChange = (event) => {
    setAuthData({
      ...authData,
      [event.target.name]: event.target.value,
      isUsernameFilled: false,
      isEmailFilled: false,
      isPasswordValid: false,
    });

    if (event.target.name == "username" && event.target.value.length == 0) {
      setAuthData({
        ...authData,
        [event.target.name]: event.target.value,
        isUsernameFilled: false,
      });
    } else if (event.target.name == "email" && event.target.value.length == 0) {
      setAuthData({
        ...authData,
        [event.target.name]: event.target.value,
        isEmailFilled: false,
      });
    } else if (
      event.target.name == "password" &&
      event.target.value.length < 8
    ) {
      setAuthData({
        ...authData,
        [event.target.name]: event.target.value,
        isPasswordValid: false,
      });
    } else {
      setAuthData({
        ...authData,
        [event.target.name]: event.target.value,
        isPasswordValid: true,
        isUsernameFilled: true,
        isEmailFilled: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignupApi({
      username: authData.username,
      email: authData.email,
      password: authData.password,
    })
      .then(() => {
        handleShowAlertOpen();
        history.push("/");
      })
      .catch(function (error) {
        console.log(error.response);
        setAuthData({
          ...authData,
          errorMsg: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="user_conatainer">
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} type={"register"}/>

      <Container component="main" maxWidth="xs">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
        </MuiThemeProvider>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            註冊
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {authData.isUsernameFilled ? (
              <TextField
                value={authData.username}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="帳號"
                name="username"
                autoComplete="username"
                autoFocus
              />
            ) : (
              <TextField
                error
                value={authData.username}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="帳號"
                name="username"
                autoComplete="username"
                autoFocus
                helperText="帳號不可為空!"
              />
            )}
            {authData.isEmailFilled ? (
              <TextField
                value={authData.email}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            ) : (
              <TextField
                error
                value={authData.email}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                helperText="Email不可為空!"
              />
            )}
            {authData.isPasswordValid ? (
              <TextField
                value={authData.password}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            ) : (
              <TextField
                error
                value={authData.password}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText="密碼需大於八位!"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              註冊
            </Button>
            <Grid container style={{ marginBottom: 50 }}>
              <div className="sign_up">
                已經有帳號嗎？
                <NavLink to="/login/" className="userLink">
                  按我登入
                </NavLink>
              </div>
            </Grid>
          </form>
        </div>
        <Switch>
          <Route exact path={"/login/"} component={Login} />
        </Switch>
      </Container>
    </div>
  );
};

export default Signup;
