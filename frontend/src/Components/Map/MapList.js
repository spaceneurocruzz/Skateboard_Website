import React, { useState, useEffect } from "react";
import {
  getGuideMapCommentsApi,
  postGuideMapCommentsApi,
} from "../../axiosApi";
import { AuthContext } from "../../App";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FilterListIcon from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TablePagination from "@material-ui/core/TablePagination";

import Container from "@material-ui/core/Container";
import Rating from "@material-ui/lab/Rating";
import MaterialTable from "material-table";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CommuteIcon from "@material-ui/icons/Commute";
import InfoIcon from "@material-ui/icons/Info";
import PlaceIcon from "@material-ui/icons/Place";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CommentIcon from "@material-ui/icons/Comment";

import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MapModalInput from "./MapModalInput";
import Avatar from "@material-ui/core/Avatar";
import TaiwanMapJson from "../../Data/TaiwanMap.json";
import { ReloadContext } from "../../Pages/Guidemap";
import shopMarker from "../../imgs/shopping-bag.png";
import skateboardMarker from "../../imgs/skateboardMarker.png";

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
  console.log(props.commentData);
  if (!props.commentData.some((t) => t.map_id === props.locationId)) {
    return <h4>目前還沒有評論哦！</h4>;
  } else {
    return (
      <List className={classes.root}>
        {props.commentData.map((data, index) => {
          if (data.map_id == props.locationId) {
            return (
              <>
                <ListItem alignItems="flex-start" key={index}>
                  {/* <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar> */}

                  <ListItemText
                    key={data.comment_id}
                    primary={data.comment_title}
                    secondary={
                      <React.Fragment key={data.comment_id + "frag"}>
                        <Grid container>
                          <Rating
                            key={data.comment_id + "rate"}
                            name="half-rating-read"
                            defaultValue={3}
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
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            );
          }
        })}
      </List>
    );
  }
};

const ShowCommentsDialog = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = (value) => {
    onClose(value);
    console.log(props);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      // fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title">關於這個場地的評論</DialogTitle>
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
        <Box ml={2}>{labels[hover !== -1 ? hover : props.ratingVal]}</Box>
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
    console.log("submit");
    let dbPost;

    dbPost = input;
    dbPost["rating"] = ratingVal;
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();

    //insert user
    //post should return commentid and post to user table
    postGuideMapCommentsApi(dbPost)
      .then((res) => {
        console.log(dbPost);
        alert("更新成功！");
        props.updateComments(dbPost);
        handleClose();
      })
      .then(() => {
        dispatch({
          type: "Reload",
        });
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
      >
        <TextField
          onChange={handleInputChange}
          size="small"
          required
          id="comment_title"
          name="comment_title"
          label="標題"
          variant="filled"
          style={{ width: 300, marginRight: 20, marginLeft: 20 }}
        />
        <TextField
          onChange={handleInputChange}
          size="small"
          required
          id="comment"
          name="comment"
          label="寫下你的心得吧..."
          variant="filled"
          style={{ width: 300, marginRight: 20, marginLeft: 20 }}
          multiline
          rows={10}
        />
        <HoverRating ratingVal={ratingVal} updateRatingVal={updateRatingVal} />

        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 60, marginRight: 20, marginLeft: 20 }}
          className={classes.submit}
        >
          送出
        </Button>
      </form>
    </Grid>
  );
};

const WriteCommentsDialog = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = (value) => {
    onClose(value);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title">我要寫評論</DialogTitle>
      <WriteComment
        locationId={props.locationId}
        username={props.username}
        commentData={props.commentData}
        updateComments={props.updateComments}
      />
    </Dialog>
  );
};

const MapList = (props) => {
  const classes = useStyles();
  const { state } = React.useContext(AuthContext);
  const [city, setCity] = useState("臺北市");
  const [district, setDistrict] = useState("中正區");
  const [locationType, setLocationType] = useState({ key: 2, label: "全部" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [response, setResponse] = useState(null);
  const initialState = [
    {
      location_name: "",
      location_type: "",
      latitude: null,
      longitude: null,
      address: "",
      traffic: "",
      openhours: null,
      phone: "",
      rating: null,
      create_dt: null,
      update_dt: null,
      modified_user: "",
    },
  ];

  const [location_name, setlocation_name] = useState("");
  const [rows, setRows] = useState([]);
  const [chipData, setChipData] = useState([
    { key: 0, label: "滑板場" },
    { key: 1, label: "店家" },
  ]);

  const locationTypeList = [
    { key: 0, label: "滑板場" },
    { key: 1, label: "店家" },
    { key: 2, label: "全部" },
  ];

  const [openShowComments, setOpenShowComments] = React.useState(false);
  const [openShowCommentsMapId, setOpenShowCommentsMapId] = React.useState(0);

  const handleShowCommentsOpen = (event, map_id) => {
    setOpenShowComments(true);
    setOpenShowCommentsMapId(map_id);
    console.log(openShowCommentsMapId);
  };

  const handleShowCommentsClose = (map_id) => {
    setOpenShowComments(false);
  };

  const [openWriteComments, setOpenWriteComments] = React.useState(false);
  const [openWriteCommentsMapId, setOpenWriteCommentsMapId] = React.useState(0);

  const handleWriteCommentsOpen = (event, map_id) => {
    setOpenWriteComments(true);
    setOpenWriteCommentsMapId(map_id);
  };

  const handleWriteCommentsClose = (value) => {
    setOpenWriteComments(false);
  };
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    getGuideMapCommentsApi()
      .then((res) => {
        console.log(commentData);
        console.log(res.data);
        // setCommentData(commentData => ({...commentData, commentData:res.data}));
        setCommentData(...commentData, res.data);
        console.log(commentData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  let dbData = props.formerDbData;

  // useEffect(() => {
  //   axios
  //     .get(`api/map/guideMap/`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setDbdata(...dbData, res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => {});
  // }, [reload]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateComments = (newValue) => {
    setCommentData([...commentData, newValue]);
    console.log(commentData);
  };

  const getTaiwanCityList = () => {
    let cityJson={};
    TaiwanMapJson.map((data, index) => {
      {
        cityJson[data.CityName] = data.CityName;
      }
    });
    // console.log(cityJson)
    return cityJson;
  };

// console.log(getTaiwanCityList())

  return (
    <>
      <ShowCommentsDialog
        open={openShowComments}
        onClose={handleShowCommentsClose}
        locationId={openShowCommentsMapId}
        commentData={commentData}
      />
      <WriteCommentsDialog
        open={openWriteComments}
        onClose={handleWriteCommentsClose}
        locationId={openWriteCommentsMapId}
        username={state.username}
        commentData={commentData}
        updateComments={updateComments}
      />

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
                { title: "地址", field: "address"},
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
              data={dbData}
              actions={[
                (rowData) => ({
                  icon: () => <CommentIcon />,
                  tooltip: "查看評論",
                  onClick: (event, rowData) =>
                    handleShowCommentsOpen(event, rowData.location_id),
                  //disabled: state.isAuthenticated,
                }),
                (rowData) => ({
                  icon: () => <RateReviewIcon />,
                  tooltip: "發表評論",
                  onClick: (event, rowData) =>
                    handleWriteCommentsOpen(event, rowData.location_id),
                  disabled: !state.isAuthenticated,
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
                  actions: "評論",
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
    </>
  );
};

export default MapList;
