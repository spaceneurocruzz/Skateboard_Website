import React, { useState, useEffect } from "react";
import {
  getFriendsGroupCommentsApi,
  getFriendsGroupApi,
} from "../../axiosApi";
import { AuthContext } from "../../App";
import ShowAlertMessages from "../ShowAlertMessages";
import ShowAlertErrorMessages from "../ShowAlertErrorMessages";

import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import MaterialTable from "material-table";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

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
  button: {
    margin: theme.spacing(1),
  },
  buttonAdd: {
    margin: theme.spacing(1),
    marginBottom: 20,
    marginTop: 50,
    textAlign: "left",
    //background:'#f05a27'
  },
}));

const FriendsGroupHistory = (props) => {
  console.log(props);
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);
  const [commentData, setCommentData] = useState([]);
  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        setDbFriendsGroupData(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    getFriendsGroupCommentsApi()
      .then((res) => {
        setCommentData(...commentData, res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

  let filterFriendsGroupData = dbFriendsGroupData.filter(
    (data) => new Date(data.group_startdt) < new Date()
  );

  if (filterFriendsGroupData != undefined || filterFriendsGroupData != null) {
    filterFriendsGroupData.map((data, index) => {
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

      data["group_startdt"] =
        data["group_startdt"].slice(0, 10) +
        " " +
        data.group_startdt.slice(11, 19);
    });
  }

  return (
    <Container component="main" maxWidth="lg" className="user_conatainer">
      <Link to="/FriendsGroup/" className="link">
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonAdd}
        >
          進行中揪團
        </Button>
      </Link>
      <Container component="main" maxWidth="lg">
        <div className={classes.root}>
          <div style={{ width: "100%", marginBottom: 50, marginTop: 10 }}>
            <MaterialTable
              title="開團列表（已過期）"
              columns={[
                { title: "ID", field: "group_id", width: 25 },
                {
                  title: "類型",
                  field: "group_type",
                  lookup: { 交流: "交流", 教學: "教學" },
                  width: 90,
                },
                //   { title: "地區", field: "city", width:100 },
                { title: "地點", field: "location_name", width: 120 },
                { title: "時間", field: "group_startdt", width: 70 },
                { title: "主題", field: "group_title", width: 270 },
                {
                  title: "剩餘名額",
                  field: "remain_count",
                  width: 100,
                },
                {
                  title: "參加人數",
                  field: "join_count",
                  width: 100,
                },
              ]}
              data={filterFriendsGroupData}
              actions={[
                (rowData) => ({
                  icon: () => (
                    <NavLink
                      to={`../friendsGroupDetail/${rowData.group_id}`}
                      key={rowData.group_id}
                      style={{ color: "black" }}
                    >
                      <ImportContactsIcon />
                    </NavLink>
                  ),
                  tooltip: "查看內容",
                }),
              ]}
              options={{
                headerStyle: {
                  backgroundColor: "#5c5c5c",
                  color: "#FFF",
                  fontSize: 16,
                },
                actionsColumnIndex: -1,
                pageSize: 10,
              }}
              localization={{
                header: {
                  actions: ["詳細內容"],
                },
              }}
            />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default FriendsGroupHistory;
