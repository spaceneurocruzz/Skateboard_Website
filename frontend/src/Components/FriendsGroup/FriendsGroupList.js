import React, { useState, useEffect } from "react";
import {
  getFriendsGroupCommentsApi,
  postFriendsGroupCommentsApi,
  patchFriendsGroupApi,
  patchUserApi,
} from "../../axiosApi";
import { AuthContext } from "../../App";
import { Link, NavLink } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MaterialTable from "material-table";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import FriendsGroupDetail from "../../Pages/FriendsGroupDetail";

import { Switch, Route, useHistory } from "react-router";
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

  useEffect(() => {
    getFriendsGroupCommentsApi()
      .then((res) => {
        setCommentData(...commentData, res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

  const joinGroup = (e, group_id) => {
    e.preventDefault();
    console.log("join success");

    let preJoinUserArr = props.getFriendsGroupDBById(group_id).join_user;
    preJoinUserArr.push(state.username);

    let updateJoinUser = {
      join_user: preJoinUserArr,
    };

    patchFriendsGroupApi(group_id, updateJoinUser)
      .then((res) => {
        props.updateFriendsGroupDBById(group_id, preJoinUserArr, "JOIN");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let preJoinArr = props.userData.group_join;
    console.log(preJoinArr);
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
        alert("已參加！");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const likeGroup = (e, group_id) => {
    e.preventDefault();
    console.log("like success");

    let prePossibleUserArr = props.getFriendsGroupDBById(group_id)
      .possible_user;
    prePossibleUserArr.push("ss");

    let updatePossibleUser = {
      possible_user: prePossibleUserArr,
    };

    patchFriendsGroupApi(group_id, updatePossibleUser)
      .then((res) => {
        props.updateFriendsGroupDBById(group_id, prePossibleUserArr, "LIKE");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let preLikeArr = props.userData.group_like;
    console.log(preLikeArr);
    if (preLikeArr == null) {
      preLikeArr = [group_id];
    } else {
      preLikeArr.push(group_id);
    }

    let groupLike = {
      group_join: preLikeArr,
    };

    patchUserApi(state.username, groupLike)
      .then((res) => {
        console.table(res.data);
        props.updateGroupUserDB(groupLike);
        alert("已追蹤！");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  const updateComment = (newComment) => {
    setCommentData([...commentData, newComment]);
  };

  //props.dbFriendsGroupData["group_startdt"] =

  return (
    <>
      <Container component="main" maxWidth="lg">
        <div className={classes.root}>
          <div style={{ width: "100%", marginBottom: 50, marginTop: 10 }}>
            <MaterialTable
              title="開團列表"
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
                // {
                //     title: "確定參加",
                //     field: "join_user",
                //     width:100
                //   },
                //   {
                //     title: "可能參加",
                //     field: "possible_user",
                //     width:100
                //   },
              ]}
              data={props.dbFriendsGroupData}
              actions={[
                (rowData) => ({
                  icon: () => <NavLink to={`friendsGroupDetail/${rowData.group_id}`}  style={{color:'black'}}><ImportContactsIcon /></NavLink>,
                  tooltip: "查看內容",
                  // onClick: (event, rowData) => {
                  //   <Link to={`friendsGroupDetail/${rowData.group_id}`}></Link>
                  //   //handleShowContentOpen(event, rowData.group_id);
                  // },
                  // disabled: !state.isAuthenticated,
                }),
                (rowData) => ({
                  icon: () => <AddCircleIcon />,
                  tooltip: "參加",
                  onClick: (event, rowData) => {
                    joinGroup(event, rowData.group_id);
                  },
                  //disabled: !state.isAuthenticated || rowData.join_user.includes(state.username),
                }),
                (rowData) => ({
                  icon: () => <FavoriteBorderIcon />,
                  tooltip: "追蹤",
                  onClick: (event, rowData) => {
                    likeGroup(event, rowData.group_id);
                  },
                  //disabled: !state.isAuthenticated || rowData.possible_user.includes(state.username),
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
                pageSize:10
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
