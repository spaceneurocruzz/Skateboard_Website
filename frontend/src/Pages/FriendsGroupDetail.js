import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../App";
import {
  getFriendsGroupCommentsApi,
  getFriendsGroupApi,
  postFriendsGroupCommentsApi,
} from "../axiosApi";
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
  console.log(props.commentData);
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
                        {`${data.comment_user} - `}
                        {data.comment}
                      </React.Fragment>
                    }
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#9a9898",
                      alignItems: "left",
                    }}
                  >{`${data.create_dt.slice(0, 10)}  ${data.create_dt.slice(
                    11,
                    19
                  )}`}</span>
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
        console.log(dbFriendsGroupData);
        console.log(res.data);
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
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    let dbPost = {};

    dbPost = input;
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();

    //insert user
    //post should return commentid and post to user table
    postFriendsGroupCommentsApi(dbPost)
      .then((res) => {
        console.log(dbPost);
        alert("更新成功！");

        setCommentData([...commentData, dbPost]);
        //props.updateComment(dbPost);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  return (
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
            <Container component="main" maxWidth="md">
              <span style={{ fontSize: 24, fontWeight: "bold" }}>
                {`${data.group_startdt.slice(0, 10)}    `}{" "}
              </span>
              <span
                style={{ fontSize: 20, fontWeight: "bold" }}
              >{`${data.group_startdt.slice(11, 19)}    `}</span>
              <span style={{ fontSize: 22, fontWeight: "bold" }}>
                {data.location_name}
              </span>
              <span style={{ textAlign: "left" }}> (ID：{data.group_id})</span>
              <ListItem>
                <ListItemText>{`地址：${data.address}`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <span>{`     人數上下限：${data.lower_limit}人 - ${data.upper_limit}人`}</span>
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
                <ListItemText>{`建立者：${data.create_user}`}</ListItemText>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    fontSize: 12,
                    color: "#9a9898",
                    alignItems: "left",
                  }}
                >{`新增日期：${data.create_dt.slice(
                  0,
                  10
                )}  ${data.create_dt.slice(11, 19)}     `}</span>
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
              {/* <TextField
                //onChange={handleInputChange}
                id="filled-multiline-static"
                label="我有問題..."
                name="comment"
                multiline
                fullWidth
                rows={3}
                value={data.comment}
                variant="filled"
              /> */}
              {/* <Grid container spacing={6}>
                <Grid item xs={8}> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <span
                  onChange={handleInputChange}
                  contentEditable="true"
                  class="box arrow-left"
                  style={{ display: "inline-block" }}
                  name="comment"
                >
                  
                </span> */}
                <TextField
                  onChange={handleInputChange}
                  size="small"
                  id="comment"
                  name="comment"
                  label="我有問題"
                  variant="filled"
                  style={{ width: 300 }}
                />

                {/* </Grid> */}
                {/* <Grid item xs={3}> */}
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
              {/* </Grid> */}
              {/* </Grid> */}
              <CommentList groupId={id} commentData={commentData} />
            </Container>
          );
        }
      })}
    </div>
  );
};

export default FriendsGroupDetail;
