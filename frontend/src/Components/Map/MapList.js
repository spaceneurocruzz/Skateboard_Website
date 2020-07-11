import React, { useState, useEffect } from "react";
import axios from "axios";

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
import ListItemText from "@material-ui/core/ListItemText";

import TaiwanMapJson from "../../Data/TaiwanMap.json";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  listItemText: {
    fontSize: 14,
  },
  boxText: {
    fontSize: 14,
  },
});

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
}));

const MapList = () => {
  const classes = useStyles();
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

  const [dbData, setDbdata] = useState([]);
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

  useEffect(() => {
    axios
      .get(`api/map/guideMap/`)
      .then((res) => {
        console.log(res.data);
        setDbdata(...dbData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const selectedArea = () => {
    const selectedCity = TaiwanMapJson.filter((c) => c.CityName === city);
    return selectedCity[0].AreaList;
  };

  const handleInputChange = (e, value, inputType) => {
    switch (inputType) {
      case "city":
        setCity(value);
      case "disctrict":
        setDistrict(value);
      case "locationType":
        setLocationType(value);
      default:
    }
    console.log(inputType);
    console.log(value);
  };

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

  const DropdownFilter = (props) => {
    return (
      <>
        <Autocomplete
          id="country-select-demo"
          style={{ width: 300, marginBottom: 20 }}
          options={TaiwanMapJson}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          onInputChange={(e, value) => handleInputChange(e, value, "city")}
          getOptionLabel={(option) => option.CityName}
          renderOption={(option) => (
            <React.Fragment>{option.CityName}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="縣市"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Autocomplete
          id="country-select-demo2"
          style={{ width: 300, marginBottom: 20 }}
          options={selectedArea()}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          onInputChange={(e, value) => handleInputChange(e, value, "disctrict")}
          getOptionLabel={(option) => option.AreaName}
          renderOption={(option) => (
            <React.Fragment>{option.AreaName}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="鄉鎮市區"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Autocomplete
          id="country-select-demo3"
          style={{ width: 200, marginBottom: 20 }}
          options={locationTypeList}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          onInputChange={(e, value) =>
            handleInputChange(e, value, "locationType")
          }
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <React.Fragment>{option.label}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="種類"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </>
    );
  };

  const InnerRow = (props) => {
    const { row, no } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    const openhoursJson = dbData[no].openhours;

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell className={classes.tablecell}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left" style={{ minWidth: 100 }}>
            {row.location_name}
          </TableCell>

          <TableCell align="left" style={{ minWidth: 200 }}>
            {row.address}
          </TableCell>
          <TableCell align="left" style={{ minWidth: 100 }}>
            {row.rating}
          </TableCell>
          <TableCell align="left" style={{ minWidth: 100 }}>
            {row.x}
          </TableCell>
        </TableRow>
        <TableRow className={classes.boxText}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                display="flex"
                justifyContent="flex-start"
                m={1}
                p={1}
                bgcolor="background.paper"
                style={{ marginLeft: 100, marginRight: 50 }}
              >
                <Box p={1} bgcolor="grey.300">
                  開放時間
                </Box>
                <Box p={1} bgcolor="grey.300">
                  <ListItemText
                    primary={`平日: ${openhoursJson["weekdayTimeStart"]}- ${openhoursJson["weekdayTimeEnd"]}`}
                    classes={{ primary: classes.listItemText }}
                  />
                  <ListItemText
                    primary={`假日與例假日: ${openhoursJson["weekendTimeStart"]}- ${openhoursJson["weekendTimeEnd"]}`}
                    classes={{ primary: classes.listItemText }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  m={1}
                  p={1}
                  bgcolor="background.paper"
                  width="50%"
                  height="100%"
                >
                  <Box p={1} bgcolor="grey.300">
                    建議交通方式
                    <ListItemText
                      primary={`${dbData[no].traffic}`}
                      classes={{ primary: classes.listItemText }}
                    />
                  </Box>
                  <Box p={1} bgcolor="grey.300">
                    介紹
                    <ListItemText
                      primary={`${dbData[no].intro}`}
                      classes={{ primary: classes.listItemText }}
                    />
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <h3 paragraph="true">場地或店家列表</h3>
      </Grid>
      <DropdownFilter />
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell
                align="left"
                className={classes.tablecell}
                style={{ minWidth: 100 }}
              >
                場地名稱
              </TableCell>
              <TableCell
                align="left"
                className={classes.tablecell}
                style={{ minWidth: 200 }}
              >
                地址
              </TableCell>
              <TableCell
                align="left"
                className={classes.tablecell}
                style={{ minWidth: 100 }}
              >
                綜合評分
              </TableCell>
              <TableCell
                align="left"
                className={classes.tablecell}
                style={{ minWidth: 100 }}
              >
                查看評價
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dbData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <InnerRow key={index} row={row} no={index} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default MapList;
