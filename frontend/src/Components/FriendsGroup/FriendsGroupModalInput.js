import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch, Route, useHistory } from "react-router";
import { postGuidemapApi } from "../../axiosApi";
import { AuthContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import FriendsGroupCreate from "../../Pages/FriendsGroupCreate"
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
  },
}));

const FriendsGroupModalInput = () => {
  const classes = useStyles();

  return (
    <>
      <Link to="/friendsGroup/create" className="link">
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonAdd}
          startIcon={<AddLocationIcon />}
        >
          我要揪團
        </Button>
      </Link>

      {/* <Switch>
        <Route
          exact
          path={"/friendsGroup/create"}
          key={"route-friendsGroupCreate"}
          render={() => <FriendsGroupCreate />}
        />
      </Switch> */}
    </>
  );
};

export default FriendsGroupModalInput;
