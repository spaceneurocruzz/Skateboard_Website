import React, { useState, useEffect } from "react";
import { getGuidemapApi, postFriendsGroupApi } from "../axiosApi";
import { AuthContext } from "../App";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MUIRichTextEditor from "mui-rte";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  createMuiTheme,
  Theme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      paddingBottom: 20,
    },
  },
}));

const defaultTheme = createMuiTheme((Theme) => {
  palette: {
    primary: {
      main: "#000000";
    }
  }
});

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        backgroundColor: "#ebebeb",
      },
      container: {
        display: "flex",
        flexDirection: "column",
      },
      editor: {
        backgroundColor: "#ebebeb",
        padding: "20px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
      },
      toolbar: {
        borderTop: "1px solid gray",
        backgroundColor: "#ebebeb",
      },
      placeHolder: {
        backgroundColor: "#ebebeb",
        paddingLeft: 20,
        width: "inherit",
        position: "absolute",
        top: "20px",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

const FriendsGroupCreate = () => {
  const { state } = React.useContext(AuthContext);
  const classes = useStyles();
  const [input, setInput] = useState({
    map_id: 0,
    group_startdt: new Date().toISOString(),
    group_enddt: new Date().toISOString(),
    location_name: "",
    latitude: 0,
    longitude: 0,
    address: "",
    group_type: "交流",
    group_title: "",
    group_content: "",
    create_user: "admin",
    // create_user: state.username,
    join_user: [],
    possible_user: [],
    create_dt: new Date().toISOString(),
    update_dt: new Date().toISOString(),
    lower_limit: 0,
    uppper_limit: 0,
  });

  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        console.log(res.data);
        setDbData(...dbData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    e.preventDefault();
    console.log("submit");
    let dbPost;

    dbPost = input;
    dbPost["create_dt"] = new Date();
    dbPost["update_dt"] = new Date();

    Geocode.enableDebug();
    Geocode.fromAddress(input.address)
      .then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
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
            console.log(dbPost);
            props.updateDB(dbPost);
            alert("更新成功！");
            //redirect
          })
          .catch((error) => {
            console.error(error.response);
          })
          .finally(() => {});
      });
  };
  const [isAddressChecked, setIsAddressChecked] = React.useState(false);

  const handleChange = (event) => {
    setIsAddressChecked(event.target.checked);
  };

  return (
    <Grid container style={{ marginTop: 20, marginBottom: 10 }}>
      <Container component="main" maxWidth="md">
        <form className={classes.formControl} noValidate autoComplete="off">
          <h2>填寫開團資訊</h2>
          <div className={classes.paper}>
            <FormControl className={classes.formControl}>
              <TextField
                onChange={handleInputChange}
                size="small"
                required
                id="create_user"
                name="create_user"
                label="建立者"
                variant="filled"
                className={classes.textField}
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
                <div className={classes.flexContainer}>
                  <h3>開團時間</h3>
                  <form className={classes.datetime} noValidate>
                    <TextField
                      onChange={handleInputChange}
                      value={input.start_dt}
                      id="datetime-local"
                      name="start_dt"
                      label="開始"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginTop: 20 }}
                    />
                  </form>
                  <form className={classes.datetime} noValidate>
                    <TextField
                      onChange={handleInputChange}
                      value={input.end_dt}
                      id="datetime-local"
                      name="end_dt"
                      label="結束"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ marginTop: 20 }}
                    />
                  </form>
                </div>
              </FormControl>
              <Autocomplete
                className={classes.textField}
                id="combo-box-demo"
                onChange={handleInputChange}
                name="location_name"
                //options={dbData.map(option => option.location_name)}
                options={dbData}
                getOptionLabel={(option) => option.location_name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="場地名稱" variant="outlined" />
                )}
                style={{ marginTop: 20 }}
              />
              <div className={classes.flexContainer}>
                <span>沒有在上面？自行輸入</span>
                <Checkbox
                  checked={isAddressChecked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  style={{ marginTop: 20 }}
                />
              </div>
              {isAddressChecked && (
                <>
                  <TextField
                    onChange={handleInputChange}
                    size="small"
                    required
                    id="location_name"
                    name="location_name"
                    label="場地名稱"
                    variant="filled"
                    fullWidth
                    style={{ marginTop: 20 }}
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
                  style={{ marginTop: 20, marginRight:20 }}
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
                size="small"
                required
                id="group_title"
                name="group_title"
                label="主題"
                variant="filled"
                fullWidth
                style={{ marginTop: 20 }}
              />
              <h3>內容</h3>
              <MuiThemeProvider theme={defaultTheme}>
                <MUIRichTextEditor label="Start typing..." />
              </MuiThemeProvider>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ marginTop: 20, width: 150 }}
              >
                確認修改
              </Button>
            </FormControl>
          </div>
        </form>
      </Container>
    </Grid>
  );
};

export default FriendsGroupCreate;
