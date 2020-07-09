import React, { useState, Fragment } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Map, GoogleApiWrapper } from "google-maps-react";
import GoogleMapReact from "google-map-react";
import Grid from "@material-ui/core/Grid";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import MapMarker from "../Components/Map/MapMarker";
import MapModalInput from "../Components/Map/MapModalInput";
import MapInfoWindow from "../Components/Map/MapInfoWindow";
import MapList from "../Components/Map/MapList";

import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Chip from "@material-ui/core/Chip";
import skateboardMarker from "../imgs/skateboardMarker.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
    display: "flex",
    // justifyContent: 'center',
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Guidemap = (props) => {
  const classes = useStyles();
  const [marker, showMarker] = useState(false);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "滑板場" },
    { key: 1, label: "店家" },
  ]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log("載入完成!"); // 印出「載入完成」
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .patch(`api/user/update/username=${state.username}`, dbData)
      .then((res) => {
        console.table(dbData);
        console.table(res.data);
        alert("更新成功！");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  const _onChildClick = () => {
    showMarker(!marker);
  };
  // _onChildClick = (key, childProps) => {
  //   const markerId = childProps.marker.get('id');
  //   const index = this.props.markers.findIndex(m => m.get('id') === markerId);
  //   if (this.props.onChildClick) {
  //     this.props.onChildClick(index);
  //   }
  // }
  const LocationFilter = () => {
    return (
      <Paper component="ul" className={classes.root}>
        {chipData.map((data) => {
          let icon;
          if (data.label === "React") {
            icon = <TagFacesIcon />;
          }
          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
                className={classes.chip}
                color="primary"
              />
            </li>
          );
        })}
      </Paper>
    );
  };

  const SBMarker = ({ icon, text }) => (
    <div>
      <img style={{ height: "30px", width: "30px" }} src={skateboardMarker} />
      <div>{text}</div>
    </div>
  );

  return (
    <Container component="main" maxWidth="md">
      <Grid container>
        <MapModalInput />
        <LocationFilter />
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            onChildClick={_onChildClick}
            bootstrapURLKeys={{
              key: "AIzaSyB7KldR4x33szhmh1Q8Vit9YynpWfvcOOs",
            }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <SBMarker
              lat={25.04}
              lng={121.512}
              name="hello"
              color="red"
              show={marker}
            />

            {/* <AnyReactComponent lat={25.04} lng={121.512} text="My Marker" /> */}
            <MapInfoWindow show={marker} />
          </GoogleMapReact>
        </div>
      </Grid>
      <MapList />
    </Container>
  );
};

Guidemap.defaultProps = {
  center: {
    lat: 25.04,
    lng: 121.5,
  },
  zoom: 15,
};

export default Guidemap;
