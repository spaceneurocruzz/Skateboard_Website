import React, { useEffect, useState } from "react";
import { AuthContext } from "../../App";
import {
  getGuidemapApi,
  getGuideMapCommentsApi,
  patchGuidemapApi,
  patchUserApi,
  postGuideMapCommentsApi,
} from "../../axiosApi";
import ShowAlertErrorMessages from "../ShowAlertErrorMessages";
import ShowAlertMessages from "../ShowAlertMessages";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import CommuteIcon from "@material-ui/icons/Commute";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InfoIcon from "@material-ui/icons/Info";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating";
import MaterialTable from "material-table";
import SyncIcon from "@material-ui/icons/Sync";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  card: {
    maxWidth: 340,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  container: {
    maxHeight: 440,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tablecell: {
    fontSize: 16,
  },
  star: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
  listItemText: {
    fontSize: 14,
  },
  inline: {
    display: "inline",
  },
  hoverRating: {
    width: 200,
    display: "flex",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CommentList = (props) => {
  const classes = useStyles();

  if (!props.commentData.some((t) => t.map_id === props.locationId)) {
    return (
      <List className={classes.root}>
        <h4 style={{ marginLeft: "auto", marginRight: "auto" }}>
          目前還沒有評論哦！
        </h4>
      </List>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <List className={classes.root}>
          {props.commentData.map((data, index) => {
            if (data.map_id == props.locationId) {
              return (
                <>
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar
                        alt="avatar"
                        src={`https://ui-avatars.com/api/?name=${data.username}&size=128&rounded=true&background=040404&color=fff`}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      key={data.comment_id}
                      primary={data.comment_title}
                      secondary={
                        <React.Fragment key={data.comment_id + "frag"}>
                          <Grid container>
                            <Rating
                              key={data.comment_id + "rate"}
                              name="half-rating-read"
                              value={data.rating}
                              precision={0.5}
                              readOnly
                            />
                          </Grid>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {`${data.username} - `}
                          </Typography>
                          {/* {data.username} */}
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
                    >
                      {data.create_dt.slice(0, 10)}{" "}
                      {data.create_dt.slice(11, 19)}
                    </span>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            }
          })}
        </List>
      </div>
    );
  }
};

const ShowCommentsDialog = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = (value) => {
    onClose(value);
  };

  let currentLocation = props.getMapDBByLocationId(props.locationId);
  let locationName = "";
  if (currentLocation != undefined) {
    locationName = currentLocation.location_name;
  }

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      //className={classes.modal}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ backgroundColor: "#b7dcf9" }}
      >
        關於 [{locationName}] 的評論
      </DialogTitle>
      <CommentList
        locationId={props.locationId}
        commentData={props.commentData}
      />
    </Dialog>
  );
};

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const HoverRating = (props) => {
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.hoverRating}>
      <Rating
        name="hover-feedback"
        value={props.ratingVal}
        precision={0.5}
        onChange={(event, newValue) => props.updateRatingVal(newValue)}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {props.ratingVal !== null && (
        <Box ml={2} style={{ fontSize: 16 }}>
          {labels[hover !== -1 ? hover : props.ratingVal]}
        </Box>
      )}
    </div>
  );
};

const WriteComment = (props) => {
  const classes = useStyles();
  const [ratingVal, setRatingVal] = useState(0);
  const [input, setInput] = useState({
    map_id: props.locationId,
    username: props.username,
    comment_title: "",
    comment: "",
    rating: 0,
    create_dt: new Date().toISOString(),
    update_dt: new Date().toISOString(),
  });

  const updateRatingVal = (newValue) => {
    setRatingVal(newValue);
  };

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dbPost;

    dbPost = input;
    dbPost["rating"] = ratingVal;
    dbPost["create_dt"] = new Date().toISOString();
    dbPost["update_dt"] = new Date().toISOString();

    //insert user
    //post should return commentid and post to user table
    postGuideMapCommentsApi(dbPost)
      .then((res) => {
        // alert("更新成功！");
        props.handleShowAlertOpen();
        props.updateComments(dbPost);
        props.onClose();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let updateRating = {
      rating: props.countCommentRating(dbPost.map_id, ratingVal),
    };

    patchGuidemapApi(dbPost.map_id, updateRating)
      .then((res) => {
        props.updateMapDBByLocationId(dbPost.map_id, updateRating, "RATING");
      })
      .then(() => {
        props.setIsDataChanged(true);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  return (
    <Grid container style={{ marginTop: 20, marginBottom: 10 }}>
      <form
        className={classes.flexContainer}
        noValidate
        autoComplete="off"
        margin="normal"
        style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}
      >
        <TextField
          onChange={handleInputChange}
          size="small"
          required
          id="comment_title"
          name="comment_title"
          label="標題"
          variant="filled"
        />
        <TextField
          onChange={handleInputChange}
          size="small"
          required
          id="comment"
          name="comment"
          label="寫下你的心得吧..."
          variant="filled"
          multiline
          rows={10}
        />
        {/* <div style={{display:'flex', alignItems:'center', marginTop:10}}> */}
        {/* <div style={{fontSize:16}}>評分</div> */}
        <HoverRating ratingVal={ratingVal} updateRatingVal={updateRatingVal} />

        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 60, marginLeft: 200, alignSelf: "flex-end" }}
          className={classes.submit}
        >
          送出
        </Button>
        {/* </div> */}
      </form>
    </Grid>
  );
};

const WriteCommentsDialog = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;

  let currentLocation = props.getMapDBByLocationId(props.locationId);
  let locationName = "";
  if (currentLocation != undefined) {
    locationName = currentLocation.location_name;
  }

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      //className={classes.modal}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ backgroundColor: "#b7dcf9" }}
      >
        我要評論 [{locationName}]
      </DialogTitle>
      <WriteComment
        locationId={props.locationId}
        username={props.username}
        commentData={props.commentData}
        updateComments={props.updateComments}
        onClose={onClose}
        countCommentRating={props.countCommentRating}
        handleShowAlertOpen={props.handleShowAlertOpen}
        setIsDataChanged={props.setIsDataChanged}
        updateMapDBByLocationId={props.updateMapDBByLocationId}
      />
    </Dialog>
  );
};

const MapTable = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.root}>
        <div style={{ width: "100%", marginBottom: 50, marginTop: 50 }}>
          <MaterialTable
            title={"場地或店家列表"}
            columns={[
              {
                title: "類型",
                field: "location_type",
                lookup: { 場地: "場地", 店家: "店家" },
                width: 100,
              },
              { title: "場地名稱", field: "location_name", width: 225 },
              { title: "地址", field: "address" },
              {
                title: "綜合評分",
                field: "rating",
                width: 220,
                render: (rowData) => {
                  return (
                    <Rating
                      name="hover-feedback"
                      value={rowData.rating}
                      readOnly
                    />
                  );
                },
              },
            ]}
            data={props.dbGuideMapData}
            actions={[
              (rowData) => ({
                icon: () => <CommentIcon />,
                tooltip: "查看評論",
                onClick: (event, rowData) =>
                  props.handleShowCommentsOpen(event, rowData.location_id),
              }),
              (rowData) => ({
                icon: () => <RateReviewIcon />,
                tooltip: "發表評論",
                onClick: (event, rowData) => {
                  props.handleWriteCommentsOpen(event, rowData.location_id);
                },
                disabled: !props.state.isAuthenticated,
              }),
              (rowData) => ({
                icon: () => <FavoriteBorderIcon />,
                tooltip: "加入最愛",
                onClick: (event, rowData) => {
                  props.likeMap(event, rowData.location_id);
                },
                disabled:
                  !props.state.isAuthenticated ||
                  (rowData.like_user != undefined
                    ? rowData.like_user.includes(props.state.username)
                    : false),
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
                actions: "評論/加入最愛",
              },
              body: {
                emptyDataSourceMessage: (
                  <span>
                    <SyncIcon />
                  </span>
                ),
              },
            }}
            detailPanel={(rowData) => {
              return (
                <Grid
                  container
                  // spacing={1}
                  style={{ backgroundColor: "#e8f8fb" }}
                >
                  <Grid item xs={12} sm={1}></Grid>
                  <Grid item xs={12} sm={4}>
                    <Box p={1}>{<ScheduleIcon />}開放時間</Box>
                    <Box p={1}>
                      <ListItemText
                        primary={`平日: ${rowData.openhours["weekdayTimeStart"]}- ${rowData.openhours["weekdayTimeEnd"]}`}
                        classes={{ primary: classes.listItemText }}
                      />
                      <ListItemText
                        primary={`假日與例假日: ${rowData.openhours["weekendTimeStart"]}- ${rowData.openhours["weekendTimeEnd"]}`}
                        classes={{ primary: classes.listItemText }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box p={1}>{<CommuteIcon />}建議交通方式</Box>
                    <Box p={1}>
                      <ListItemText
                        primary={`${rowData.traffic}`}
                        classes={{ primary: classes.listItemText }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box p={1}>{<InfoIcon />}場地介紹</Box>
                    <Box p={1}>
                      <ListItemText
                        primary={`${rowData.intro}`}
                        classes={{ primary: classes.listItemText }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              );
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
          />
        </div>
      </div>
    </Container>
  );
};

const MapList = (props) => {
  const { state } = React.useContext(AuthContext);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [dbGuideMapData, setDbGuideMapData] = useState([]);
  const [isGuidemapLoaded, setIsGuidemapLoaded] = useState(false);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        props.getGuideMapDB(res.data);
      })
      .then((res) => {
        setIsGuidemapLoaded(true);
        setIsDataChanged(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, [isDataChanged]);

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

  const [openShowComments, setOpenShowComments] = React.useState(false);
  const [openShowCommentsMapId, setOpenShowCommentsMapId] = React.useState(0);

  const handleShowCommentsOpen = (event, map_id) => {
    setOpenShowComments(true);
    setOpenShowCommentsMapId(map_id);
  };

  const handleShowCommentsClose = () => {
    setOpenShowComments(false);
  };

  const [openWriteComments, setOpenWriteComments] = React.useState(false);
  const [openWriteCommentsMapId, setOpenWriteCommentsMapId] = React.useState(0);

  const handleWriteCommentsOpen = (event, map_id) => {
    setOpenWriteComments(true);
    setOpenWriteCommentsMapId(map_id);
  };

  const handleWriteCommentsClose = () => {
    setOpenWriteComments(false);
  };
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    getGuideMapCommentsApi()
      .then((res) => {
        setCommentData(...commentData, res.data);
      })
      .then((res) => {
        setIsDataChanged(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const countCommentRating = (mapId, ratingVal) => {
    let ratingTotal = 0;
    let dataCount = 0;
    let dataByMapId = commentData.filter((group) => group.map_id == mapId);

    for (let idx in dataByMapId) {
      ratingTotal += Number(dataByMapId[idx].rating);
      dataCount++;
    }

    ratingTotal += ratingVal;
    dataCount += 1;
    if (dataCount === 0) {
      dataCount = 1;
    }

    return Math.round((ratingTotal / dataCount) * 10) / 10;
  };

  const updateComments = (newValue) => {
    setCommentData([...commentData, newValue]);
  };

  const likeMap = (e, location_id) => {
    e.preventDefault();

    let preLikeUserArr = props.getMapDBByLocationId(location_id).like_user;
    console.log(preLikeUserArr);
    if (preLikeUserArr == null || preLikeUserArr == undefined) {
      preLikeUserArr = [state.username];
    } else {
      preLikeUserArr.push(state.username);
    }

    let updateLikeUser = {
      like_user: preLikeUserArr,
    };

    patchGuidemapApi(location_id, updateLikeUser)
      .then((res) => {
        props.updateMapDBByLocationId(location_id, preLikeUserArr, "LIKE");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});

    let preLikeArr = props.userData.map_like;

    if (preLikeArr == null) {
      preLikeArr = [location_id];
    } else {
      preLikeArr.push(location_id);
    }

    let mapLike = {
      map_like: preLikeArr,
    };

    patchUserApi(state.username, mapLike)
      .then((res) => {
        props.updateGroupUserDB(mapLike);
        handleShowAlertOpen();
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  if (!isGuidemapLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <ShowAlertMessages
          open={openShowAlert}
          onClose={handleShowAlertClose}
        />
        <ShowAlertErrorMessages
          open={openShowErrorAlert}
          onClose={handleShowErrorAlertClose}
        />

        <ShowCommentsDialog
          dbGuideMapData={props.dbGuideMapData}
          open={openShowComments}
          onClose={handleShowCommentsClose}
          locationId={openShowCommentsMapId}
          commentData={commentData}
          getMapDBByLocationId={props.getMapDBByLocationId}
        />
        <WriteCommentsDialog
          open={openWriteComments}
          onClose={handleWriteCommentsClose}
          locationId={openWriteCommentsMapId}
          username={state.username}
          commentData={commentData}
          updateComments={updateComments}
          countCommentRating={countCommentRating}
          handleShowAlertOpen={handleShowAlertOpen}
          setIsDataChanged={setIsDataChanged}
          getMapDBByLocationId={props.getMapDBByLocationId}
          updateMapDBByLocationId={props.updateMapDBByLocationId}
        />
        <MapTable
          state={state}
          dbGuideMapData={props.dbGuideMapData}
          handleShowCommentsOpen={handleShowCommentsOpen}
          handleWriteCommentsOpen={handleWriteCommentsOpen}
          likeMap={likeMap}
        />
      </>
    );
  }
};

export default MapList;
