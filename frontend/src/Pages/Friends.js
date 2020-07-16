import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";
import AddLocationIcon from "@material-ui/icons/AddLocation";

import MaterialTable from "material-table";

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
  buttonAdd: {
    margin: theme.spacing(1),
  },
}));

const Friends = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: "地點", field: "name" },
      { title: "時間", field: "surname" },
      { title: "標題", field: "birthYear" },
      {
        title: "建立者",
        field: "birthCity",
        lookup: { 34: "Elon Musk", 63: "Bill Gates" },
      },
      { title: "目前參加人數", field: "birthYear2", type: "numeric" },
    ],
    data: [
      {
        name: "XX滑板場123",
        surname: "2020/7/7",
        birthYear: "練習OO",
        birthCity: 63,
      },
      {
        name: "OO極限運動中心",
        surname: "2020/7/7",
        birthYear: "練習XX",
        birthCity: 34,
      },
    ],
  });

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonAdd}
          onClick={handleOpen}
          startIcon={<AddLocationIcon />}
        >
          我要揪團
        </Button>
        <Grid container>
          <div style={{ width: "100%", marginBottom: 50 }}>
            <MaterialTable
              options={{
                actionsColumnIndex: -1,
              }}
              localization={{
                pagination: {
                  labelDisplayedRows: "{from}-{to} of {count}",
                },
                toolbar: {
                  nRowsSelected: "{0} row(s) selected",
                },
                header: {
                  actions: "參加",
                },
                body: {
                  emptyDataSourceMessage: "No records to display",
                  filterRow: {
                    filterTooltip: "Filter",
                  },
                },
              }}
              title="開團列表"
              columns={state.columns}
              data={state.data}
              actions={[
                {
                  icon: "save",
                  tooltip: "Save User",
                  onClick: (event, rowData) => alert(" 已加入 " + rowData.name),
                },
              ]}
              detailPanel={(rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      // color: "white",
                      // backgroundColor: "#E53935",
                    }}
                  >
                    <div>地圖：</div>
                    <div>
                      詳細內容：在{rowData.name}練習豚跳 新手高手都歡迎來衝一波
                    </div>
                  </div>
                );
              }}
              onRowClick={(event, rowData, togglePanel) => togglePanel()}
              //   editable={{
              //     onRowAdd: (newData) =>
              //       new Promise((resolve) => {
              //         setTimeout(() => {
              //           resolve();
              //           setState((prevState) => {
              //             const data = [...prevState.data];
              //             data.push(newData);
              //             return { ...prevState, data };
              //           });
              //         }, 600);
              //       }),
              //     onRowUpdate: (newData, oldData) =>
              //       new Promise((resolve) => {
              //         setTimeout(() => {
              //           resolve();
              //           if (oldData) {
              //             setState((prevState) => {
              //               const data = [...prevState.data];
              //               data[data.indexOf(oldData)] = newData;
              //               return { ...prevState, data };
              //             });
              //           }
              //         }, 600);
              //       }),
              //     onRowDelete: (oldData) =>
              //       new Promise((resolve) => {
              //         setTimeout(() => {
              //           resolve();
              //           setState((prevState) => {
              //             const data = [...prevState.data];
              //             data.splice(data.indexOf(oldData), 1);
              //             return { ...prevState, data };
              //           });
              //         }, 600);
              //       }),
              //   }}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Friends;
