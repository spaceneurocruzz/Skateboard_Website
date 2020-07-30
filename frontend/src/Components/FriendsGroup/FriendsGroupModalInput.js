import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
import { postGuidemapApi } from "../../axiosApi";
import { AuthContext } from "../../App";
import ShowAlertMessages from "../ShowAlertMessages"

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FriendsGroupCreate from "../../Pages/FriendsGroupCreate";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    margin: theme.spacing(1),
    marginBottom: 20,
    marginTop: 50,

    //background:'#f05a27'
  },
}));

const FriendsGroupModalInput = (props) => {
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);

  return (
    <>
      {/* {state.isAuthenticated ? ( */}
        <Link
          to={{
            pathname: "/friendsGroup/create",
            state: {
              dbFriendsGroupData: props.dbFriendsGroupData,
            },
          }}
          className="link"
        >
          <Button
            variant="contained"
            color="secondary"
            className={classes.buttonAdd}
            startIcon={<PostAddIcon />}
          >
            我要揪團
          </Button>
        </Link>
      {/* ) : (
        <Button
          variant="contained"
          color="default"
          className={classes.buttonAdd}
          startIcon={<PostAddIcon />}
        >
          請登入即可新增揪團
        </Button>
      ) 
      }*/}
    </>
  );
};

export default FriendsGroupModalInput;
