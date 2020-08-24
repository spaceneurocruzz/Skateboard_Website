import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUserApi } from "../axiosApi";
import { useNotifyContext, REMOVE } from "../NotifyContext";
import "../css/app.css";
import { AuthContext } from "../App";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapIcon from "@material-ui/icons/Map";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.success.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Notification = (props) => {
  const { state } = React.useContext(AuthContext);
  const { notifyDispatch } = useNotifyContext();

  const defaultProps = {
    color: "secondary",
    children: <NotificationsIcon style={{ color: "#CA3900", fontSize: 28 }} />,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (state.username == null) {
    useEffect(() => {
      getUserApi(localStorage.getItem("username"))
        .then((res) => {
          props.initUserDB(res.data);
        })
        .then(() => {
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {});
    }, []);
  } else {
    useEffect(() => {
      getUserApi(state.username)
        .then((res) => {
          props.initUserDB(res.data);
        })
        .then(() => {
          setIsDataChanged(false);
        })
        .catch((error) => {
          console.error(error.response);
        })
        .finally(() => {});
    }, []);
  }

  const filteredGroupJoin = () => {
    let filteredData = [];
    if(!props.userData.group_join){
        props.userData.group_join.map((joinId, index) => {
          let nowDt = new Date();
          let data = props.dbFriendsGroupData.filter(
            (group) =>
              group.group_id == joinId &&
              new Date(group.group_startdt) >= nowDt &&
              new Date(group.group_startdt) < nowDt.setMonth(nowDt.getMonth() + 1)
          )[0];
          if (!data) {
            filteredData.push(data);
          }
        });
        return filteredData;
      }
      else{
        return 0;
      } 
  };

  return (
    <div>
      <Badge
        badgeContent={filteredGroupJoin().length}
        max={999}
        {...defaultProps}
        onClick={handleClick}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <span style={{ marginLeft: 5 }}>即將到來的活動(1個月內)</span>
        {filteredGroupJoin() != 0 ? filteredGroupJoin().map((data, index) => {
          if (!data) {
            return (
              <NavLink
                to={`/friendsGroupDetail/${data.group_id}`}
                className="userLink"
              >
                <StyledMenuItem>
                  <ListItemIcon>
                    <PeopleAltIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={data.location_name}
                    secondary={data.group_startdt}
                  />
                </StyledMenuItem>
              </NavLink>
            );
          }
        }):  <span></span>}
      </StyledMenu>
    </div>
  );
};

export default Notification;
