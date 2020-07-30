import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../App";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Switch, Route, useHistory } from "react-router";
import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";

import MaterialTable from "material-table";
import FriendsGroupList from "../Components/FriendsGroup/FriendsGroupList";
import FriendsGroupDetail from "../Pages/FriendsGroupDetail";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FriendsGroupModalInput from "../Components/FriendsGroup/FriendsGroupModalInput";
import { getFriendsGroupApi, getUserApi } from "../axiosApi";
//import { Switch } from "@material-ui/core";

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
  scrolltop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FriendsGroup = (props) => {
  const { state } = React.useContext(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token") || null;
    const refreshToken = localStorage.getItem("refresh_token") || null;

    if (accessToken && refreshToken) {

    }
  }, []);

  const getFriendsGroupDBById = (group_id) => {
    if (props.dbFriendsGroupData != undefined) {
      return props.dbFriendsGroupData.find(
        (data) => data.group_id === group_id
      );
    } else {
      return null;
    }
  };

  const updateFriendsGroupDBById = (group_id, newData, type) => {
    let index = props.dbFriendsGroupData.findIndex(
      (data) => data.group_id === group_id
    );

    switch (type) {
      case "JOIN":
        props.dbFriendsGroupData[index].join_user = newData;
        break;
      case "LIKE":
        props.dbFriendsGroupData[index].possible_user = newData;
        break;
      default:
        console.log("none");
    }
    props.updateFriendsGroupDB([...props.dbFriendsGroupData]);
  };

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        props.updateFriendsGroupDB(...props.dbFriendsGroupData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  // useEffect(()=>{
  //   if(dbFriendsGroupData != undefined || dbFriendsGroupData !=null){
  //     dbFriendsGroupData.map((data, index) => {
  //       if(data["join_user"]!=undefined || data["join_user"]!=null||
  //       data["possible_user"]!=undefined || data["possible_user"]!=null||
  //       data["upper_limit"]!=undefined || data["upper_limit"]!=null)
  //       {
  //         data["join_count"] = data["join_user"].length;
  //         console.log(data["upper_limit"])

  //         if(data["upper_limit"] === 0){
  //           data["remain_count"] = 999
  //         }
  //         else{
  //           data["remain_count"] = data["upper_limit"] - data["join_user"].length;
  //         }
  //       }
  //     });
  //   }
  // },[dbFriendsGroupData])

  if (
    props.dbFriendsGroupData != undefined ||
    props.dbFriendsGroupData != null
  ) {
    props.dbFriendsGroupData.map((data, index) => {
      if (
        data["join_user"] != undefined ||
        data["join_user"] != null ||
        data["possible_user"] != undefined ||
        data["possible_user"] != null ||
        data["upper_limit"] != undefined ||
        data["upper_limit"] != null
      ) {
        data["join_count"] = data["join_user"].length;
       
        if (data["upper_limit"] === 0) {
          data["remain_count"] = 999;
        } else {
          data["remain_count"] = data["upper_limit"] - data["join_user"].length;
        }
      }
    });
  }

  const ScrollTop = (props) => {
    const { children } = props;
    const classes = useStyles();

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrolltop}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <Container component="main" maxWidth="lg" style={{textAlign: "center" }} className="user_conatainer">
        <Grid container id="back-to-top-anchor">
          <FriendsGroupModalInput
            dbFriendsGroupData={props.dbFriendsGroupData}
          />
          <FriendsGroupModalInput
            dbFriendsGroupData={props.dbFriendsGroupData}
          />
        </Grid>
        <Grid container>
          <FriendsGroupList
            dbFriendsGroupData={props.dbFriendsGroupData}
            updateFriendsGroupDB={props.updateFriendsGroupDB}
            updateFriendsGroupDBById={updateFriendsGroupDBById}
            getFriendsGroupDBById={getFriendsGroupDBById}
            userData={props.userData}
            updateUserDB={props.updateUserDB}
            updateGroupUserDB={props.updateGroupUserDB}
          />
        </Grid>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default FriendsGroup;
