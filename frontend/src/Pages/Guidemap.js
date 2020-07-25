import React, { useState, useEffect } from "react";
import { patchUserApi } from "../axiosApi";
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
import shopMarker from "../imgs/shopping-bag.png";
import skateboardMarker from "../imgs/skateboardMarker.png";
import placelike from "../imgs/placelike.png";
import placeunlike from "../imgs/placeunlike.png";
import share from "../imgs/share.png";

import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import CircularProgress from "@material-ui/core/CircularProgress";

React.useLayoutEffect = React.useEffect;

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
  inlineContainer: {
    display: "inline",
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
  scrolltop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const countMap = (mapId) => {
    return props.dbFriendsGroupData.filter((group) => group.map_id == mapId)
      .length;
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
    if (mapMarker.showingInfoWindow)
      setMapMarker({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

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

  const addtoFavorite = (e, locationName) => {
    e.preventDefault();
    console.log("add to favorite");

    let preLikeMapArr = props.userData.map_like;

    if (preLikeMapArr == null) {
      preLikeMapArr = [locationName];
    } else {
      preLikeMapArr.push(locationName);
    }

    let mapLike = {
      map_like: preLikeMapArr,
    };

    patchUserApi(state.username, mapLike)
      .then((res) => {
        console.table(res.data);
        props.updateGroupUserDB(mapLike);
        alert("已加到最愛！");
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {});
  };

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Grid container id="back-to-top-anchor">
          <div className={classes.flexContainer}>
            <MapModalInput
              updateDB={props.updateGuideMapDB}
              formerDbData={props.dbGuideMapData}
              userData={props.userData}
            />
            {/* <LocationFilter /> */}
            <h3 style={{ marginLeft: 20, marginBottom: 20, marginTop: 50 }}>
              <span style={{ verticalAlign: "middle" }}>場地</span>
              <img
                src={skateboardMarker}
                style={{ height: 32, verticalAlign: "middle" }}
              />
              <span style={{ verticalAlign: "middle" }}>店家</span>
              <img
                src={shopMarker}
                style={{ height: 32, verticalAlign: "middle" }}
              />
            </h3>
          </div>
        </Grid>
      </Container>
      <Grid
        container
        style={{ width: "80%", height: "60vh", textAlign: "center" }}
      >
        <div>
          <Map
            style={{ height: "60vh" }}
            className="map"
            google={props.google}
            initialCenter={{
              lat: 25.04,
              lng: 121.51,
            }}
            onClick={onMapClicked}
            zoom={13}
          >
            {props.dbGuideMapData.map((data, index) =>
              data.location_type === "場地" ? (
                <Marker
                  icon={{
                    url: skateboardMarker,
                    anchor: new google.maps.Point(32, 32),
                    scaledSize: new google.maps.Size(32, 32),
                  }}
                  key={index}
                  name={data.location_name}
                  address={data.address}
                  groupCount={countMap(data.location_id)}
                  position={{ lat: data.latitude, lng: data.longitude }}
                  onClick={onMarkerClick}
                />
              ) : (
                <Marker
                  icon={{
                    url: shopMarker,
                    anchor: new google.maps.Point(32, 32),
                    scaledSize: new google.maps.Size(32, 32),
                  }}
                  key={index}
                  name={data.location_name}
                  address={data.address}
                  groupCount={countMap(data.location_id)}
                  position={{ lat: data.latitude, lng: data.longitude }}
                  onClick={onMarkerClick}
                />
              )
            )}

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
                      <a
                        href={
                          "https://www.google.com/maps/dir/?api=1&destination=" +
                          mapMarker.selectedLocation.address
                        }
                      >
                        {mapMarker.selectedLocation.address}
                      </a>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing className={classes.cardAction}>
                    <a
                      href="#"
                      onClick={() =>
                        addtoFavorite(mapMarker.selectedLocation.name)
                      }
                    >
                      <img
                        src={placeunlike}
                        alt="placeunlike"
                        style={{ height: 32, zIndex: 500 }}
                      />
                    </a>
                    {/* <IconButton aria-label="add to favorites" onClick={()=>addtoFavorite(mapMarker.selectedLocation.name)}>
                      <FavoriteIcon />
                    </IconButton> */}
                    <img
                      src={share}
                      alt="share"
                      style={{ height: 32 }}
                      onClick={() =>
                        addtoFavorite(mapMarker.selectedLocation.name)
                      }
                    />

                    {/* <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton> */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ padding: 10 }}
                    >
                      目前揪團數：{mapMarker.selectedLocation.groupCount}
                    </Typography>
                  </CardActions>
                </Card>
              )}
            </InfoWindow>
          </Map>
        </div>
      </Grid>
      {/* {!isLoading && <CircularProgressWithLabel value={progress} />} */}
      <Container component="main" maxWidth="lg">
        <Grid container>
          <MapList
            formerDbData={props.dbGuideMapData}
            updateGuideMapDB={props.updateGuideMapDB}
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyB7KldR4x33szhmh1Q8Vit9YynpWfvcOOs",
})(Guidemap);
