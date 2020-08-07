import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNotifyContext, REMOVE } from "../NotifyContext";
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

//   console.log(notify)
if(props.dbFriendsGroupData[0] != undefined){
  return (
    <div>
      {/* <NotificationsIcon
            style={{ fontSize: 28, color: "#CA3900", marginLeft: 20 }}
            onClick={handleClick}
          /> */}
      <Badge
        badgeContent={props.dbFriendsGroupData.length}
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
        <NavLink to="/guidemap" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <MapIcon fontSize="small" />
            </ListItemIcon>
            {/* <ListItemText primary={notify[0]} /> */}
          </StyledMenuItem>
        </NavLink>
        <NavLink to="/friendsgroup" className="hamLink">
          <StyledMenuItem>
            <ListItemIcon>
              <GroupAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={props.dbFriendsGroupData[0].location_name}/>
          </StyledMenuItem>
        </NavLink>
      </StyledMenu>
    </div>
  );}else{
      return <div>xx</div>
  }
};

export default Notification;
