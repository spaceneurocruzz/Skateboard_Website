import React, { useState, Fragment } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Map, GoogleApiWrapper } from "google-maps-react";
import GoogleMapReact from "google-map-react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import MuiPhoneNumber from "material-ui-phone-number";

import MuiDialogActions from "@material-ui/core/DialogActions";

// import Card, { CardActions, CardContent, CardMedia } from '@material-ui/Card';
// import Typography from '@material-ui/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: "25ch",
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
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    // color: blue[900],
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
}));

const MapModalInput = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("park");
  const [phone, setPhone] = useState();

  // const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (value) => {
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    // axios
    //   .patch(`api/user/update/username=${state.username}`, dbData)
    //   .then((res) => {
    //     console.table(dbData);
    //     console.table(res.data);
    //     alert("更新成功！");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {});
  };

  return (
    <>
      <Grid container>
        <Button onClick={handleOpen}>新增地點</Button>
      </Grid>
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
        {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle> */}
        <Fade in={open}>
          <>
            <h3 id="transition-modal-title">來新增滑板場或店家吧！</h3>

            <div className={classes.paper}>
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                  <Grid container>
                    <FormControl component="fieldset">
                      {/* <FormLabel component="legend">Gender</FormLabel> */}
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender1"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="park"
                          control={<Radio />}
                          label="場地"
                        />
                        <FormControlLabel
                          value="shop"
                          control={<Radio />}
                          label="店家"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid container>
                    <TextField
                      size="small"
                      required
                      id="filled-required"
                      name="nickname"
                      label="名稱"
                      variant="filled"
                      style={{ width: 300 }}
                    />
                  </Grid>
                  <Grid container>
                    <TextField
                      size="small"
                      required
                      id="filled-required"
                      name="nickname"
                      label="地址"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>

                  <Grid container>
                    開放時間
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="開始"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="結束"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change time",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid container>
                    {/* <TextField
                    type="number"
                      size="small"
                      id="filled-required"
                      name="nickname"
                      label="電話"
                      variant="filled"
                      style={{ width: 300 }}
                    /> */}
                    電話:{" "}
                    <MuiPhoneNumber
                      defaultCountry={"tw"}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid container>
                    <TextField
                      size="small"
                      id="filled-search"
                      label="建議交通方式"
                      name="location"
                      variant="filled"
                      multiline
                      fullWidth
                      rows={2}
                    />
                  </Grid>
                  <Grid container>
                    <TextField
                      size="small"
                      id="filled-search"
                      label="場地介紹"
                      name="location"
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
                </Grid>
              </form>
            </div>
          </>
        </Fade>
      </Dialog>
    </>
  );
};

export default MapModalInput;
