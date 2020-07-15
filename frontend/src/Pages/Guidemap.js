import React, { useState, useEffect } from "react";
import { getGuidemapApi } from "../axiosApi";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { AuthContext } from "../App";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import MapModalInput from "../Components/Map/MapModalInput";
import MapList from "../Components/Map/MapList";
import skateboardMarker from "../imgs/skateboardMarker.png";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

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
  cardContent: {
    padding: 10,
  },
  cardAction: {
    padding: 10,
  },
}));

const Guidemap = (props) => {
  const { state } = React.useContext(AuthContext);
  const classes = useStyles();
  const [marker, showMarker] = useState(false);
  const [place, setPlace] = useState(0);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "滑板場" },
    { key: 1, label: "店家" },
  ]);

  const [dbData, setDbdata] = useState([]);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        console.log(dbData);
        console.log(res.data);
        setDbdata(...dbData, res.data);
        console.log(dbData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const [mapMarker, setMapMarker] = useState({
    activeMarker: {},
    selectedLocation: {},
    showingInfoWindow: false,
  });

  const onMarkerClick = (props, marker) =>
    setMapMarker({
      activeMarker: marker,
      selectedLocation: props,
      showingInfoWindow: true,
    });

  const onInfoWindowClose = () =>
    setMapMarker({
      activeMarker: null,
      showingInfoWindow: false,
    });

  const onMapClicked = () => {
    console.log(mapMarker.showingInfoWindow);
    if (mapMarker.showingInfoWindow)
      setMapMarker({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  // const LocationFilter = () => {
  //   console.log(dbData);
  //   return (
  //     <Paper component="ul" className={classes.root}>
  //       {chipData.map((data) => {
  //         let icon;
  //         if (data.label === "React") {
  //           icon = <TagFacesIcon />;
  //         }
  //         return (
  //           <li key={data.key}>
  //             <Chip
  //               icon={skateboardMarker}
  //               label={data.label}
  //               onDelete={
  //                 data.label === "React" ? undefined : handleDelete(data)
  //               }
  //               className={classes.chip}
  //               color="primary"
  //             />
  //           </li>
  //         );
  //       })}
  //     </Paper>
  //   );
  // };

  const updateDB = (newData) => {
    setDbdata([...dbData, newData]);
  };

  const show = () => {
    console.log(dbData);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <MapModalInput updateDB={updateDB} formerDbData={dbData} />
        {/* <LocationFilter /> */}
      </Grid>
      <Grid container>
        <div style={{ height: "100vh" }}>
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
                icon={{
                  url: skateboardMarker,
                  anchor: new google.maps.Point(32, 32),
                  scaledSize: new google.maps.Size(32, 32),
                }}
                key={index}
                name={data.location_name}
                address={data.address}
                position={{ lat: data.latitude, lng: data.longitude }}
                onClick={onMarkerClick}
              />
            ))}

            <InfoWindow
              marker={mapMarker.activeMarker}
              onClose={onInfoWindowClose}
              visible={mapMarker.showingInfoWindow}
            >
              {mapMarker.showingInfoWindow && (
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h6">
                      {mapMarker.selectedLocation.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {mapMarker.selectedLocation.address}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing className={classes.cardAction}>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              )}
            </InfoWindow>
          </Map>
        </div>
      </Grid>
      <Grid container>
        <MapList formerDbData={dbData} updateDB={updateDB} />
      </Grid>
    </Container>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB7KldR4x33szhmh1Q8Vit9YynpWfvcOOs",
})(Guidemap);
