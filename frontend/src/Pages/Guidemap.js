import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Chip from "@material-ui/core/Chip";

import MapModalInput from "../Components/Map/MapModalInput";
import MapList from "../Components/Map/MapList";
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
  const [place, setPlace] = useState(0);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "滑板場" },
    { key: 1, label: "店家" },
  ]);

  const [dbData, setDbdata] = useState([]);

  useEffect(() => {
    axios
      .get(`api/map/guideMap/`)
      .then((res) => {
        setDbdata(...dbData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const [state, setState] = useState({
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
  });

  const onMarkerClick = (props, marker) =>
    setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  const onInfoWindowClose = () =>
    setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  const onMapClicked = () => {
    if (state.showingInfoWindow)
      setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

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

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <MapModalInput />
        {/* <LocationFilter /> */}
      </Grid>
      <Grid container>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map
            className="map"
            google={props.google}
            initialCenter={{
              lat: 25.04,
              lng: 121.51,
            }}
            onClick={onMapClicked}
            zoom={13}
          >
            {dbData.map((data, index) => (
              <Marker
                key={index}
                name={data.location_name}
                position={{ lat: data.latitude, lng: data.longitude }}
                onClick={onMarkerClick}
              />
            ))}

            <InfoWindow
              marker={state.activeMarker}
              onClose={onInfoWindowClose}
              visible={state.showingInfoWindow}
            >
              <div>
                <h4>{state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </Grid>
      <Grid container>
        <MapList />
      </Grid>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB7KldR4x33szhmh1Q8Vit9YynpWfvcOOs",
})(Guidemap);
