import React, { useEffect } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import FriendsGroupList from "../Components/FriendsGroup/FriendsGroupList";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FriendsGroupModalInput from "../Components/FriendsGroup/FriendsGroupModalInput";
import { getFriendsGroupApi } from "../axiosApi";

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
    marginBottom: 20,
    marginTop: 50,
    marginLeft: 50,
  },
  scrolltop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FriendsGroup = (props) => {
  const classes = useStyles();

  const getFriendsGroupDBById = (group_id) => {
    if (props.dbFriendsGroupData != undefined) {
      return props.dbFriendsGroupData.find(
        (data) => data.group_id === group_id
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    getFriendsGroupApi()
      .then((res) => {
        props.updateFriendsGroupDB(...props.dbFriendsGroupData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  if (
    props.dbFriendsGroupData != undefined ||
    props.dbFriendsGroupData != null
  ) {
    props.dbFriendsGroupData.map((data, index) => {
      if (
        data["join_user"] != undefined ||
        data["join_user"] != null ||
        data["possible_user"] != undefined ||
        data["possible_user"] != null ||
        data["upper_limit"] != undefined ||
        data["upper_limit"] != null
      ) {
        data["join_count"] = data["join_user"].length;

        if (data["upper_limit"] === 0) {
          data["remain_count"] = 999;
        } else {
          data["remain_count"] = data["upper_limit"] - data["join_user"].length;
        }
      }
    });
  }

  const ScrollTop = (props) => {
    const { children } = props;
    const classes = useStyles();

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrolltop}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        style={{ textAlign: "center" }}
        className="user_conatainer"
      >
        <Grid container id="back-to-top-anchor">
          <FriendsGroupModalInput
            dbFriendsGroupData={props.dbFriendsGroupData}
          />
          <Link to="/FriendsGroupHistory/" className="link">
            <Button
              variant="contained"
              color="text.primary"
              className={classes.buttonAdd}
            >
              歷史揪團
            </Button>
          </Link>
        </Grid>
        <Grid container>
          <FriendsGroupList
            dbFriendsGroupData={props.dbFriendsGroupData}
            updateFriendsGroupDB={props.updateFriendsGroupDB}
            getFriendsGroupDBById={getFriendsGroupDBById}
            userData={props.userData}
            updateUserDB={props.updateUserDB}
            updateGroupUserDB={props.updateGroupUserDB}
          />
        </Grid>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default FriendsGroup;
