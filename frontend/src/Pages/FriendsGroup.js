import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";

import MaterialTable from "material-table";
import FriendsGroupList from "../Components/FriendsGroup/FriendsGroupList";
import FriendsGroupModalInput from "../Components/FriendsGroup/FriendsGroupModalInput";
import { getFriendsGroupApi } from "../axiosApi";

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
  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);

  const updateFriendsGroupDB = (newData) => {
    setDbFriendsGroupData([...dbFriendsGroupData, newData]);
  };

  const getFriendsGroupDBById = (group_id) => {
    if (dbFriendsGroupData != undefined) {
      return dbFriendsGroupData.find((data) => data.group_id === group_id);
    } else {
      console.log("nothing");
      return null;
    }
  };

  const updateFriendsGroupDBById = (group_id, newData) => {
    setDbFriendsGroupData([
      ...dbFriendsGroupData,
      dbFriendsGroupData.map((data, index) => {
        data.group_id === group_id
          ? { ...data, newData } //all coloumns, data.join_user == props.dbFriendsGroupData["join_user"]
          : data;
      }),
    ]);

    console.log(dbFriendsGroupData);
  };

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        console.log(dbFriendsGroupData);
        console.log(res.data);
        setDbFriendsGroupData(...dbFriendsGroupData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  if(dbFriendsGroupData != undefined || dbFriendsGroupData !=null){
    dbFriendsGroupData.map((data, index) => {
      if(data["join_user"]!=undefined || data["join_user"]!=null||
      data["upper_limit"]!=undefined || data["upper_limit"]!=null)
      {
        data["join_count"] = data["join_user"].length;
        console.log(data["upper_limit"])
        if(data["upper_limit"] === 0){
          data["remain_count"] = "不限"
        }
        else{
          data["remain_count"] = data["upper_limit"] - data["join_user"].length;
        }
      }
    });
  }

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <FriendsGroupModalInput dbFriendsGroupData={dbFriendsGroupData} />
      </Grid>
      <Grid container>
        <FriendsGroupList
          dbFriendsGroupData={dbFriendsGroupData}
          updateFriendsGroupDB={updateFriendsGroupDB}
          updateFriendsGroupDBById={updateFriendsGroupDBById}
          getFriendsGroupDBById={getFriendsGroupDBById}
        />
      </Grid>
    </Container>
  );
};

export default FriendsGroup;
