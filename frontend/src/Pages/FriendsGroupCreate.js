import React, { useState, useEffect } from "react";
import { getGuidemapApi, postFriendsGroupApi } from "../axiosApi";
import { AuthContext } from "../App";
import Geocode from "react-geocode";
import ShowAlertMessages from "../Components/ShowAlertMessages";
import ShowAlertErrorMessages from "../Components/ShowAlertErrorMessages";
import { googleMapApiKey } from "../constants";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Alert, AlertTitle } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import indexmanstand from "../imgs/indexmanstand.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
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
    datetime: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      paddingBottom: 20,
    },
  },
}));

const FriendsGroupCreate = (props) => {
  const { state } = React.useContext(AuthContext);
  const classes = useStyles();
  const [input, setInput] = useState({
    map_id: 1,
    group_startdt: new Date().toISOString(),
    group_enddt: new Date().toISOString(),
    location_name: "",
    latitude: 0,
    longitude: 0,
    address: "",
    group_type: "交流",
    group_title: "",
    group_content: "",
    create_user: state.username,
    join_user: [],
    possible_user: [],
    create_dt: new Date().toISOString(),
    update_dt: new Date().toISOString(),
    lower_limit: 0,
    upper_limit: 0,
  });

  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        setDbData(...dbData, res.data);
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  }, []);

  const handleInputChange = (event) => {
    if (
      event.target.name == "group_startdt" ||
      event.target.name == "group_enddt"
    ) {
      setInput({
        ...input,
        [event.target.name]: event.target.value
          .toLocaleString()
          .replace("T", " "),
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isValid, setIsValid] = useState(true);
  const [errorFields, setErrorFields] = useState([]);

  const checkValid = () => {
    let errorArr = [];
    setErrorFields({ errorFields: [] }); //no clear

    if (!input.location_name) {
      errorArr.push("場地名稱");
      setIsValid(false);
    }
    if (!input.group_title) {
      errorArr.push("主題");
    }
    if (!input.group_startdt) {
      errorArr.push("開始日期");
    }
    if (!input.group_enddt) {
      errorArr.push("結束日期");
    }
    if (!input.group_content) {
      errorArr.push("內容");
      setErrorFields([...errorFields, errorArr]);
      setOpen(true);

      return false;
    }
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

  const handleContentChange = (event, value) => {
    setInput({
      ...input,
      location_name: value.location_name,
    });
  };

  const getMapDatabyLocationName = (locationName) => {
    return dbData.find((data) => data.location_name == locationName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dbPost = input;

    dbPost["create_user"] = state.username;
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();

    if (input.address == "") {
      let mapData = getMapDatabyLocationName(dbPost.location_name);
      if (mapData == undefined || mapData == null) {
        handleShowErrorAlertOpen();
      } else {
        input["address"] = mapData.address;
        input["map_id"] = mapData.location_id;
      }
    }

    Geocode.setApiKey(googleMapApiKey);
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
        postFriendsGroupApi(dbPost)
          .then((res) => {
            props.updateFriendsGroupDB([...props.dbFriendsGroupData, dbPost]);
            handleShowAlertOpen();
            window.location.href = "/#/friendsgroup";
          })
          .catch((error) => {
            handleShowErrorAlertOpen();
            console.error(error.response);
          })
          .finally(() => {});
      });
  };
  const [isAddressChecked, setIsAddressChecked] = React.useState(false);

  const handleChange = (event) => {
    setIsAddressChecked(event.target.checked);
  };

  const Alert = () => {
    return (
      <Alert severity="error">
        <AlertTitle>以下資料不可為空！</AlertTitle>
        <span>{errorFields.join(", ")}</span>
      </Alert>
    );
  };

  const WriteDetail = () => {
    return (
      <>
        <Grid item xs={6} style={{ marginLeft: 100 }}>
          <form className={classes.formControl} noValidate autoComplete="off">
            <h2>填寫開團資訊</h2>
            <div className={classes.paper}>
              <FormControl className={classes.formControl}>
                <TextField
                  disabled
                  defaultValue={state.username}
                  id="create_user"
                  name="create_user"
                  label="建立者"
                  variant="filled"
                  className={classes.textField}
                  style={{ width: 250 }}
                />
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={handleInputChange}
                    row
                    aria-label="group_type"
                    name="group_type"
                    value={input.group_type}
                    style={{ marginTop: 20 }}
                  >
                    <FormControlLabel
                      value="交流"
                      control={<Radio />}
                      label="交流"
                    />
                    <FormControlLabel
                      value="教學"
                      control={<Radio />}
                      label="教學"
                    />
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <div
                    className={classes.flexContainer}
                    style={{ marginBottom: 20 }}
                  >
                    <span style={{ fontSize: 16, display: "block" }}>
                      開團時間
                    </span>
                    <TextField
                      required
                      onChange={handleInputChange}
                      // value={input.start_dt}
                      id="datetime-local"
                      name="group_startdt"
                      label="開始"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginTop: 20 }}
                    />
                    <TextField
                      required
                      onChange={handleInputChange}
                      // value={input.end_dt}
                      id="datetime-local"
                      name="group_enddt"
                      label="結束"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginTop: 20 }}
                    />
                  </div>
                </FormControl>
                {!isAddressChecked && (
                  <Autocomplete
                    className={classes.textField}
                    id="combo-box-demo"
                    onChange={handleContentChange}
                    name="location_name"
                    options={dbData}
                    getOptionLabel={(option) => option.location_name}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="場地名稱"
                        variant="outlined"
                      />
                    )}
                    style={{ width: 500, marginBottom: 20 }}
                  />
                )}

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAddressChecked}
                      onChange={handleChange}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  }
                  label="沒有在上面？自行輸入"
                />
                {isAddressChecked && (
                  <>
                    <TextField
                      required
                      onChange={handleInputChange}
                      size="small"
                      id="location_name"
                      name="location_name"
                      label="場地名稱"
                      variant="filled"
                      fullWidth
                      style={{ marginTop: 20 }}
                    />
                    <TextField
                      required
                      onChange={handleInputChange}
                      size="small"
                      id="address"
                      name="address"
                      label="地址"
                      variant="filled"
                      fullWidth
                      style={{ marginTop: 20 }}
                    />
                  </>
                )}
                <div className={classes.flexContainer}>
                  <TextField
                    id="lower_limit"
                    label="人數下限"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    style={{ marginTop: 20, marginRight: 20 }}
                  />
                  <TextField
                    id="uppper_limit"
                    label="人數上限"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    style={{ marginTop: 20 }}
                  />
                </div>
                <TextField
                  onChange={handleInputChange}
                  // size="small"
                  required
                  id="group_title"
                  name="group_title"
                  label="主題"
                  variant="filled"
                  fullWidth
                  style={{ marginTop: 20 }}
                />
                <h3>內容</h3>
                <TextField
                  required
                  onChange={handleInputChange}
                  id="filled-multiline-static"
                  label="填寫相關內容"
                  name="group_content"
                  multiline
                  fullWidth
                  rows={8}
                  value={input.group_content}
                  variant="filled"
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{ marginTop: 20, width: 150, marginBottom: 70 }}
                >
                  確認修改
                </Button>
              </FormControl>
            </div>
          </form>
        </Grid>
        <Grid item xs>
          <div>
            <img
              src={indexmanstand}
              style={{
                height: 700,
                width: "auto",
                marginTop: 150,
                marginBottom: 70,
              }}
              alt="banner"
            />
          </div>
        </Grid>
      </>
    );
  };

  return (
    <>
      <ShowAlertMessages open={openShowAlert} onClose={handleShowAlertClose} />
      <ShowAlertErrorMessages
        open={openShowErrorAlert}
        onClose={handleShowErrorAlertClose}
      />

      <Grid container style={{ marginTop: 20, marginBottom: 10 }}>
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
          <Fade in={open}>
            <Alert />
          </Fade>
        </Dialog>
        <WriteDetail />
      </Grid>
    </>
  );
};

export default FriendsGroupCreate;
