import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";

import MaterialTable from "material-table";
import FriendsGroupList from "../Components/FriendsGroup/FriendsGroupList";
import FriendsGroupModalInput from "../Components/FriendsGroup/FriendsGroupModalInput";

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

const FriendsGroup = () => {
 
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
      <FriendsGroupModalInput />
      </Grid>
      <Grid container>
        <FriendsGroupList />
      </Grid>
    </Container>
  );
};

export default FriendsGroup;
