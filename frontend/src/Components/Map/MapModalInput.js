import React, { useState } from "react";
import { postGuidemapApi } from "../../axiosApi";
import { AuthContext } from "../../App";
import ShowAlertMessages from "../ShowAlertMessages";
import ShowAlertErrorMessages from "../ShowAlertErrorMessages";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MuiPhoneNumber from "material-ui-phone-number";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import Geocode from "react-geocode";

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
    marginBottom: 20,
    marginTop: 50,
  },
}));

const MapModalInput = (props) => {
  const { state } = React.useContext(AuthContext);
  Geocode.setApiKey("AIzaSyB7KldR4x33szhmh1Q8Vit9YynpWfvcOOs");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    location_type: "場地",
    location_name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    traffic: "",
    intro: "",
    create_dt: new Date().toISOString(),
    update_dt: new Date().toISOString(),
    modified_user: state.username,
  });

  const [phone, setPhone] = useState();
  const [weekdayTimeStart, setWeekdayTimeStart] = useState(
    new Date("2014-08-18T09:00:00")
  );
  const [weekdayTimeEnd, setWeekdayTimeEnd] = useState(
    new Date("2014-08-18T21:00:00")
  );
  const [weekendTimeStart, setWeekendTimeStart] = useState(
    new Date("2014-08-18T09:00:00")
  );
  const [weekendTimeEnd, setWeekendTimeEnd] = useState(
    new Date("2014-08-18T21:00:00")
  );
  const [pickWeekTime, setPickWeekTime] = useState([<PickWeekTime />]);

  const handleWeekdayTimeStartChange = (event) => {
    setWeekdayTimeStart(event);
  };

  const handleWeekdayTimeEndChange = (event) => {
    setWeekdayTimeEnd(event);
  };

  const handleWeekendTimeStartChange = (event) => {
    setWeekendTimeStart(event);
  };

  const handleWeekendTimeEndChange = (event) => {
    setWeekendTimeEnd(event);
  };

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputPhoneChange = (value) => {
    setPhone(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let dbPost;

    dbPost = input;
    (dbPost["modified_user"] = state.username), (dbPost["phone"] = phone);
    dbPost["openhours"] = {
      weekdayTimeStart: weekdayTimeStart.toLocaleTimeString(),
      weekdayTimeEnd: weekdayTimeEnd.toLocaleTimeString(),
      weekendTimeStart: weekendTimeStart.toLocaleTimeString(),
      weekendTimeEnd: weekendTimeEnd.toLocaleTimeString(),
    };
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();

    let preAddMapArr = props.userData.map_add;
    if (preAddMapArr == null) {
      preAddMapArr = [input.location_name];
    } else {
      preAddMapArr.push(input.location_name);
    }

    let mapAdd = {
      map_add: preAddMapArr,
    };

    Geocode.enableDebug();
    Geocode.fromAddress(input.address)
      .then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setInput({ latitude: lat, longitude: lng });
          dbPost["latitude"] = lat;
          dbPost["longitude"] = lng;
        },
        (error) => {
          console.error(error);
        }
      )
      .then(() => {
        postGuidemapApi(dbPost)
          .then((res) => {
            props.updateGuideMapDB(dbPost);
            handleShowAlertOpen();
            handleClose();
          })
          .then(() => {
            patchUserApi(state.username, mapAdd)
              .then((res) => {
                console.table(res.data);
                props.updateGroupUserDB(mapAdd);
              })
              .catch((error) => {
                handleShowErrorAlertOpen();
                console.error(error.response);
              })
              .finally(() => {});
          })
          .catch((error) => {
            handleShowErrorAlertOpen();
            console.error(error.response);
          })
          .finally(() => {});
      });
  };

  const PickWeekTime = () => {
    return (
      <Grid container>
        <Grid container style={{ marginTop: 20, marginBottom: 10 }}>
          開放時間
        </Grid>
        <FormControl className={classes.formControl}>
          <div className={classes.flexContainer}>
            <div style={{ marginRight: 20, paddingRight: 70 }}>平日</div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <KeyboardTimePicker
                  style={{ width: 150 }}
                  margin="normal"
                  label="開始"
                  name="weekdayTimeStart"
                  value={weekdayTimeStart}
                  onChange={handleWeekdayTimeStartChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
                <KeyboardTimePicker
                  style={{ width: 150 }}
                  margin="normal"
                  label="結束"
                  name="weekdayTimeEnd"
                  value={weekdayTimeEnd}
                  onChange={handleWeekdayTimeEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.flexContainer}>
            <div style={{ marginRight: 20, paddingRight: 20 }}>
              假日與例假日
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardTimePicker
                  style={{ width: 150 }}
                  margin="normal"
                  label="開始"
                  name="weekendTimeStart"
                  value={weekendTimeStart}
                  onChange={handleWeekendTimeStartChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
                <KeyboardTimePicker
                  style={{ width: 150 }}
                  margin="normal"
                  label="結束"
                  name="weekendTimeEnd"
                  value={weekendTimeEnd}
                  onChange={handleWeekendTimeEndChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </FormControl>
      </Grid>
    );
  };

  const CreateNewMap = () => {
    return (
      <Grid
        container
        style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 20 }}
      >
        <h3 id="transition-modal-title">來新增滑板場或店家吧！</h3>
        <div className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            {/* <Grid container>
                  <Grid container> */}
            <FormControl component="fieldset">
              <RadioGroup
                onChange={handleInputChange}
                row
                aria-label="gender"
                name="location_type"
                value={input.location_type}
              >
                <FormControlLabel
                  value="場地"
                  control={<Radio />}
                  label="場地"
                />
                <FormControlLabel
                  value="店家"
                  control={<Radio />}
                  label="店家"
                />
              </RadioGroup>
            </FormControl>
            {/* </Grid> */}

            <TextField
              onChange={handleInputChange}
              size="small"
              required
              id="location_name"
              name="location_name"
              label="名稱"
              variant="filled"
              style={{ width: 300 }}
            />

            <TextField
              onChange={handleInputChange}
              size="small"
              required
              id="address"
              name="address"
              label="地址"
              variant="filled"
              fullWidth
            />

            {pickWeekTime.map((item, index) => (
              <PickWeekTime key={index} id={index} />
            ))}
            <Grid container style={{ marginTop: 20, marginBottom: 10 }}>
              電話:{" "}
              <MuiPhoneNumber
                defaultCountry={"tw"}
                onChange={handleInputPhoneChange}
              />
            </Grid>
            <Grid container>
              <TextField
                onChange={handleInputChange}
                size="small"
                id="traffic"
                label="建議交通方式"
                name="traffic"
                variant="filled"
                multiline
                fullWidth
                rows={2}
              />
            </Grid>
            <Grid container>
              <TextField
                onChange={handleInputChange}
                size="small"
                id="intro"
                label="場地介紹"
                name="intro"
                variant="filled"
                multiline
                fullWidth
                rows={5}
              />
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              確認修改
            </Button>
          </form>
        </div>
      </Grid>
    );
  };

  return (
    <>
      {state.isAuthenticated ? (
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonAdd}
          onClick={handleOpen}
          startIcon={<AddLocationIcon />}
        >
          新增地點
        </Button>
      ) : (
        <Button
          variant="contained"
          color="default"
          className={classes.buttonAdd}
          disabled
          startIcon={<AddLocationIcon />}
        >
          請登入即可新增地點及發表評論
        </Button>
      )}
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <ShowAlertMessages
          open={openShowAlert}
          onClose={handleShowAlertClose}
        />
        <ShowAlertErrorMessages
          open={openShowErrorAlert}
          onClose={handleShowErrorAlertClose}
        />

        <Fade in={open}>
          <CreateNewMap />
        </Fade>
      </Dialog>
    </>
  );
};

export default MapModalInput;
