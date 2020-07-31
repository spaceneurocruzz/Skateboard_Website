import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../App";
import {
  getFriendsGroupCommentsApi,
  getFriendsGroupApi,
  postFriendsGroupCommentsApi,
} from "../axiosApi";
import ShowAlertMessages from "../Components/ShowAlertMessages";
import ShowAlertErrorMessages from "../Components/ShowAlertErrorMessages";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "../css/app.css";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import FaceIcon from "@material-ui/icons/Face";

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
    padding: 20,
    margin: 40,
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

const CommentList = (props) => {
  const classes = useStyles();
  if (
    props.commentData == undefined ||
    !props.commentData.some((t) => t.group_id == props.groupId)
  ) {
    return <span>目前還沒有留言哦！</span>;
  } else {
    return (
      <List className={classes.root}>
        {props.commentData.map((data, index) => {
          if (data.group_id == props.groupId) {
            if (data.create_dt == undefined) {
              console.log(data.create_dt);
              data.create_dt = new Date().toISOString();
              console.log(data.create_dt);
            }
            return (
              <>
                <ListItem alignItems="flex-start" key={index}>
                  {/* <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar> */}

                  <ListItemText
                    key={data.group_id}
                    primary={
                      <React.Fragment key={data.group_id + "group"}>
                        <div style={{ color: "#0198e3" }}>
                          <PersonPinIcon />
                          {`${data.comment_user}`}
                        </div>
                        <div>{data.comment}</div>
                      </React.Fragment>
                    }
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#9a9898",
                      alignItems: "left",
                    }}
                  >
                     {data.create_dt.toString()}
                    {/*{`${data.create_dt
                      .toString()
                      .slice(0, 10)}  ${data.create_dt
                      .toString()
                      .slice(11, 20)}`}*/}
                  </span>
                </ListItem>
                {/* <Divider variant="inset" component="li" /> */}
              </>
            );
          }
        })}
      </List>
    );
  }
};

const FriendsGroupDetail = (props) => {
  const classes = useStyles();
  let { id } = useParams();

  const { state } = React.useContext(AuthContext);
  const [commentData, setCommentData] = useState([]);
  const [dbFriendsGroupData, setDbFriendsGroupData] = useState([]);
  const [input, setInput] = useState({
    group_id: id,
    comment_user: state.username,
    comment: "",
    create_dt: new Date().toISOString(),
    update_dt: new Date().toISOString(),
  });

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        setDbFriendsGroupData(...dbFriendsGroupData, res.data);
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

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dbPost = {};

    dbPost = input;
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();
    console.log(dbPost);
    //insert user
    //post should return commentid and post to user table
    postFriendsGroupCommentsApi(dbPost)
      .then((res) => {
        handleShowAlertOpen();

        setCommentData([...commentData, dbPost]);
        console.log(commentData);
        //props.updateComment(dbPost);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  return (
    <>
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} />
      <ShowAlertErrorMessages
        open={openShowErrorAlert}
        onClose={handleShowErrorAlertClose}
      />

      <div>
        {dbFriendsGroupData.map((data, index) => {
          if (data.group_id == id) {
            {
              /* if (data.group_id == props.groupId) {
          if (data.lower_limit === 0 && data.upper_limit === 0) {
            data.lower_limit = 999;
            data.upper_limit = 999;
          } else if (data.lower_limit === 0) {
            data.lower_limit = 999;
          } else {
            data.upper_limit = 999;
          } */
            }
            return (
              <Container
                component="main"
                maxWidth="md"
                style={{ marginTop: 70 }}
              >
                <Grid Container>
                  <div style={{ marginTop: 70, marginBottom: 30 }}>
                    <span style={{ fontSize: 24, fontWeight: "bold" }}>
                      {`${data.group_startdt.slice(0, 10)}    `}{" "}
                    </span>
                    <span
                      style={{ fontSize: 20, fontWeight: "bold" }}
                    >{`${data.group_startdt.slice(11, 19)}    `}</span>
                    <span style={{ fontSize: 22, fontWeight: "bold" }}>
                      {data.location_name}
                    </span>
                    <span style={{ textAlign: "left" }}>
                      {" "}
                      (ID：{data.group_id})
                    </span>
                    <span
                      style={{ marginLeft: 100 }}
                    >{`建立者：${data.create_user}`}</span>
                  </div>
                  <ListItem>
                    <ListItemText>
                      {/* {`地址：${data.address}`} */}
                      地址：
                      <a
                        href={
                          "https://www.google.com/maps/dir/?api=1&destination=" +
                          data.address
                        }
                      >
                        {`${data.address}`}
                      </a>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      {data.lower_limit == 0 && data.upper_limit == 0 && (
                        <span>{`     人數上下限：- 人 至  -人`}</span>
                      )}
                      {data.lower_limit == 0 && data.upper_limit != 0 && (
                        <span>{`     人數上下限：- 人 至  ${data.upper_limit}人`}</span>
                      )}
                      {data.lower_limit != 0 && data.upper_limit == 0 && (
                        <span>{`     人數上下限：${data.lower_limit}人 至  -人`}</span>
                      )}
                      {data.lower_limit != 0 && data.upper_limit != 0 && (
                        <span>{`     人數上下限：${data.lower_limit}人 至 ${data.upper_limit}人`}</span>
                      )}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>{`內容：${data.group_content}`}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>{`參加名單：${data.join_user}`}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>{`追蹤名單：${data.possible_user}`}</ListItemText>
                  </ListItem>
                  <ListItem>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#9a9898",
                        alignItems: "left",
                        marginRight: 10,
                      }}
                    >{`新增日期：${data.create_dt.slice(
                      0,
                      10
                    )}  ${data.create_dt.slice(11, 19)}`}</span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#9a9898",
                        alignItems: "left",
                      }}
                    >{`更新日期：${data.update_dt.slice(
                      0,
                      10
                    )}  ${data.update_dt.slice(11, 19)}`}</span>
                  </ListItem>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 50,
                  }}
                >
                  <TextField
                    onChange={handleInputChange}
                    size="small"
                    id="comment"
                    name="comment"
                    label="我有問題"
                    variant="filled"
                    style={{ width: 300, marginRight: 20 }}
                  />
                  <Button
                    style={{ height: 40 }}
                    onClick={handleSubmit}
                    variant="contained"
                    color="secondary"
                    //className={classes.button}
                    endIcon={<Icon>send</Icon>}
                  >
                    送出留言
                  </Button>
                </div>
                <Grid
                  Container
                  style={{
                    backgroundColor: "#fff",
                    marginBottom: 50,
                    marginTop: 40,
                  }}
                >
                  <CommentList groupId={id} commentData={commentData} />
                </Grid>
              </Container>
            );
          }
        })}
      </div>
    </>
  );
};

export default FriendsGroupDetail;
