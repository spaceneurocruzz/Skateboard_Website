import React, { useState, useEffect } from "react";
import {
  getFriendsGroupCommentsApi,
  patchFriendsGroupApi,
  patchUserApi,
  getFriendsGroupApi,
} from "../../axiosApi";
import { AuthContext } from "../../App";
import ShowAlertMessages from "../ShowAlertMessages";
import ShowAlertErrorMessages from "../ShowAlertErrorMessages";

import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import MaterialTable from "material-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
  buttonAdd: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const FriendsGroupList = (props) => {
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
    (data) => new Date(data.group_startdt) >= new Date()
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

  const updateFriendsGroupDBById = (group_id, newData, type) => {
    let index = dbFriendsGroupData.findIndex(
      (data) => data.group_id === group_id
    );

    switch (type) {
      case "JOIN":
        dbFriendsGroupData[index].join_user = newData;
        break;
      case "LIKE":
        dbFriendsGroupData[index].possible_user = newData;
        break;
      default:
        console.log("none");
    }
    props.updateFriendsGroupDB([...dbFriendsGroupData]);
  };

  const [openShowAlert, setOpenShowAlert] = React.useState(false);

  const handleShowAlertOpen = () => {
    setOpenShowAlert(true);
  };

  const handleShowAlertClose = () => {
    setOpenShowAlert(false);
  };

  const [openShowErrorAlert, setOpenShowErrorAlert] = React.useState(false);

  const handleShowErrorAlertOpen = () => {
    setOpenShowErrorAlert(true);
  };

  const handleShowErrorAlertClose = () => {
    setOpenShowErrorAlert(false);
  };

  const joinGroup = (e, group_id) => {
    e.preventDefault();

    let preJoinUserArr = props.getFriendsGroupDBById(group_id).join_user;
    if (preJoinUserArr == null || preJoinUserArr == undefined) {
      preJoinUserArr = [state.username];
    } else {
      preJoinUserArr.push(state.username);
    }

    let updateJoinUser = {
      join_user: preJoinUserArr,
    };

    patchFriendsGroupApi(group_id, updateJoinUser)
      .then((res) => {
        updateFriendsGroupDBById(group_id, preJoinUserArr, "JOIN");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let preJoinArr = props.userData.group_join;

    if (preJoinArr == null) {
      preJoinArr = [group_id];
    } else {
      preJoinArr.push(group_id);
    }

    let groupJoin = {
      group_join: preJoinArr,
    };

    patchUserApi(state.username, groupJoin)
      .then((res) => {
        console.table(res.data);
        props.updateGroupUserDB(groupJoin);
        handleShowAlertOpen();
        //alert("已參加！");
      })
      .catch((error) => {
        handleShowErrorAlertOpen();
        console.error(error.response);
      })
      .finally(() => {});
  };

  const likeGroup = (e, group_id) => {
    e.preventDefault();

    let prePossibleUserArr = props.getFriendsGroupDBById(group_id)
      .possible_user;

    if (prePossibleUserArr == null || prePossibleUserArr == undefined) {
      prePossibleUserArr = [state.username];
    } else {
      prePossibleUserArr.push(state.username);
    }

    let updatePossibleUser = {
      possible_user: prePossibleUserArr,
    };

    patchFriendsGroupApi(group_id, updatePossibleUser)
      .then((res) => {
        updateFriendsGroupDBById(group_id, prePossibleUserArr, "LIKE");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let preLikeArr = props.userData.group_like;

    if (preLikeArr == null) {
      preLikeArr = [group_id];
    } else {
      preLikeArr.push(group_id);
    }

    let groupLike = {
      group_like: preLikeArr,
    };

    patchUserApi(state.username, groupLike)
      .then((res) => {
        console.table(res.data);
        props.updateGroupUserDB(groupLike);
        handleShowAlertOpen();
        //alert("已追蹤！");
      })
      .catch((error) => {
        handleShowErrorAlertOpen();
        console.error(error.response);
      })
      .finally(() => {});
  };

  const updateComment = (newComment) => {
    setCommentData([...commentData, newComment]);
  };

  return (
    <>
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} />
      <ShowAlertErrorMessages
        open={openShowErrorAlert}
        onClose={handleShowErrorAlertClose}
      />

      <Container component="main" maxWidth="lg">
        <div className={classes.root}>
          <div style={{ width: "100%", marginBottom: 50, marginTop: 10 }}>
            <MaterialTable
              title="開團列表（進行中）"
              columns={[
                { title: "ID", field: "group_id", width: 25 },
                {
                  title: "類型",
                  field: "group_type",
                  lookup: { 交流: "交流", 教學: "教學" },
                  width: 80,
                },
                //   { title: "地區", field: "city", width:100 },
                { title: "地點", field: "location_name", width: 120 },
                { title: "時間", field: "group_startdt", width: 90 },
                { title: "主題", field: "group_title", width: 250 },
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
                      to={`friendsGroupDetail/${rowData.group_id}`}
                      key={rowData.group_id}
                      style={{ color: "black" }}
                    >
                      <ImportContactsIcon />
                    </NavLink>
                  ),
                  tooltip: "查看內容",
                }),
                (rowData) => ({
                  icon: () => <AddCircleIcon />,
                  tooltip: "參加",
                  onClick: (event, rowData) => {
                    joinGroup(event, rowData.group_id);
                  },
                  disabled:
                    !state.isAuthenticated ||
                    (rowData.join_user != undefined
                      ? rowData.join_user.includes(state.username)
                      : true),
                }),
                (rowData) => ({
                  icon: () => <TrackChangesIcon />,
                  tooltip: "追蹤",
                  onClick: (event, rowData) => {
                    likeGroup(event, rowData.group_id);
                  },
                  disabled:
                    !state.isAuthenticated ||
                    (rowData.possible_user != undefined
                      ? rowData.possible_user.includes(state.username)
                      : true),
                }),
              ]}
              options={{
                headerStyle: {
                  backgroundColor: "#015da5",
                  color: "#FFF",
                  fontSize: 16,
                },
                actionsColumnIndex: -1,
                pageSize: 10,
              }}
              localization={{
                header: {
                  actions: ["詳細內容/ ", "參加/ ", "追蹤"],
                },
              }}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default FriendsGroupList;
