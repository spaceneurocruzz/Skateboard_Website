import React, { useState } from "react";
import { postGuidemapApi } from "../../axiosApi";
import { AuthContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import PlusOneIcon from '@material-ui/icons/PlusOne';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MaterialTable from "material-table";
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingBottom: 20,
  },
  button: {
    margin: 10,
    paddingTop: 20,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  buttonAdd: {
    margin: theme.spacing(1),
  },
}));

const FriendsGroupList = () => {
  const classes = useStyles();

  // data: [
  //   {
  //     name: "XX滑板場123",
  //     surname: "2020/7/7",
  //     birthYear: "練習OO",
  //     birthCity: 63,
  //   },
  //   {
  //     name: "OO極限運動中心",
  //     surname: "2020/7/7",
  //     birthYear: "練習XX",
  //     birthCity: 34,
  //   },
  // ],

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.root}>
        <div style={{ width: "100%", marginBottom: 50, marginTop: 10 }}>
          <MaterialTable
            title="開團列表"
            columns={[
              { title: "ID", field: "group_id", width: 30 },
              {
                title: "類型",
                field: "group_type",
                lookup: { 交流: "交流", 教學: "教學" },
                width: 90,
              },
              //   { title: "地區", field: "city", width:100 },
              { title: "地點", field: "location_name", width: 120 },
              { title: "時間", field: "group_dt", width: 70 },
              { title: "主題", field: "group_title", width: 280 },
              {
                title: "剩餘名額",
                field: "remain_count",
                width:100,
              },
              {
                title: "目前參加人數",
                field: "join_user",
                width: 90,
              },
              //   {
              //     title: "可能參加人數",
              //     field: "possible_user",
              //     width:50
              //   },
            ]}
            data={[
              {
                group_id: "1",
                location_name: "XX滑板場123",
                group_dt: "2020/07/07 1200-1800",
                city: "台北市南港區",
                group_type: "交流",
                group_title: "練習一下豚跳",
                lower_limit: "2",
                upper_limit: "12",
                create_user: "123",
                join_user: "12",
                possible_user: "10",
              },
              {
                group_id: "2",
                location_name: "XX滑板場123",
                group_dt: "2020/07/07 1200-1800",
                city: "台北市南港區",
                group_type: "交流",
                group_title: "練習一下豚跳",
                lower_limit: "2",
                upper_limit: "12",
                create_user: "123",
                join_user: "12",
                possible_user: "10",
              },
            ]}
            actions={[
              (rowData) => ({
                icon: () => <AddCircleIcon />,
                tooltip: "參加",
                onClick: (event, rowData) =>{},
                //disabled: state.isAuthenticated,
              }),
              (rowData) => ({
                icon: () => <FavoriteBorderIcon />,
                tooltip: "追蹤",
                onClick: (event, rowData) =>{},
                // disabled: !state.isAuthenticated,
              }),
            ]}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#015da5",
                color: "#FFF",
                fontSize: 16,
              },
              actionsColumnIndex: -1,
            }}
            localization={{
              header: {
                actions: "參加或追蹤",
              },
            }}
            // detailPanel={(rowData) => {
            //   return (
            //     <Grid
            //       container
            //       // spacing={1}
            //       style={{ backgroundColor: "#e8f8fb" }}
            //     >
            //       <Grid item xs={12} sm={1}></Grid>
            //       <Grid item xs={12} sm={4}>
            //         <Box p={1}>{<ScheduleIcon />}開放時間</Box>
            //         <Box p={1}>
            //           <ListItemText
            //             primary={`平日: ${rowData.openhours["weekdayTimeStart"]}- ${rowData.openhours["weekdayTimeEnd"]}`}
            //             classes={{ primary: classes.listItemText }}
            //           />
            //           <ListItemText
            //             primary={`假日與例假日: ${rowData.openhours["weekendTimeStart"]}- ${rowData.openhours["weekendTimeEnd"]}`}
            //             classes={{ primary: classes.listItemText }}
            //           />
            //         </Box>
            //       </Grid>
            //       <Grid item xs={12} sm={3}>
            //         <Box p={1}>{<CommuteIcon />}建議交通方式</Box>
            //         <Box p={1}>
            //           <ListItemText
            //             primary={`${rowData.traffic}`}
            //             classes={{ primary: classes.listItemText }}
            //           />
            //         </Box>
            //       </Grid>
            //       <Grid item xs={12} sm={4}>
            //         <Box p={1}>{<InfoIcon />}場地介紹</Box>
            //         <Box p={1}>
            //           <ListItemText
            //             primary={`${rowData.intro}`}
            //             classes={{ primary: classes.listItemText }}
            //           />
            //         </Box>
            //       </Grid>
            //     </Grid>
            //   );
            // }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
          />
        </div>
      </div>
    </Container>
  );
};

export default FriendsGroupList;
