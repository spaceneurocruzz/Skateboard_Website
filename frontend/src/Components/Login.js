import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router";
import axiosInstance, {
  loginApi,
  getUserApi,
  getUserLoginApi,
} from "../axiosApi";
import Signup from "./Signup";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../css/app.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    backgroundColor: theme.palette.secondary.main,
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

export const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    username: "",
    password: "",
    isSubmitting: true,
    errorMsg: null,
  };

  const [authData, setAuthData] = useState(initialState);

  const handleInputChange = (event) => {
    setAuthData({
      ...authData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthData({
      ...authData,
      isSubmitting: true,
      errorMsg: null,
    });

    loginApi({
      username: authData.username,
      password: authData.password,
    })
      .then((response) => {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        localStorage.setItem("username", authData.username);
        return response;
      })
      .then((json) => {
        dispatch({
          type: "LOGIN",
          payload: json,
        });
      })
      .then(() => {
        if(authData.username != ""){
          getUserApi(authData.username).then((res) => {
            console.table(res.data);
            props.initUserDB(res.data);
          });
        }
        history.push("/");
      })
      .catch(function (error) {
        setAuthData({
          ...authData,
          isSubmitting: false,
          errorMsg: error.message || error.statusText,
        });
      });
  };

  if (localStorage.getItem != null) {
    useEffect(() => {
      getUserApi(authData.username)
        .then((res) => {
          console.table(res.data);
          props.initUserDB(res.data);
          //setDbdata(res.data);
          //console.table(dbData);
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {});
    }, []);
  }

  return (
    <div className="user_conatainer">
    <Container component="main" maxWidth="xs">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
      </MuiThemeProvider>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登入
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          {authData.isSubmitting ? (
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
              helperText="密碼錯誤，請再試一次．"
            />
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor :"#188af2", color: 'white'}}
            className={classes.submit}
          >
            登入
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                忘記密碼?
              </Link>
            </Grid>
            <Grid item>
              {/* <NavLink to="/signup/" variant="body2"> */}
              還沒有帳號嗎？
              <NavLink to="/signup/" className="userLink">
                按我註冊
                {/* {"還沒有帳號嗎？ 按我註冊"} */}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Switch>
        <Route exact path={"/signup/"} component={Signup} />
      </Switch>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
    </div>
  );
};

export default Login;
