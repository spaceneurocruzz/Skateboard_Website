import React, { useState, useEffect } from "react";
import { patchUserApi, getGuidemapApi } from "../axiosApi";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { AuthContext } from "../App";

import MapModalInput from "../Components/Map/MapModalInput";
import MapList from "../Components/Map/MapList";
import shopMarker from "../imgs/shopping-bag.png";
import skateboardMarker from "../imgs/skateboardMarker.png";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

React.useLayoutEffect = React.useEffect;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    display: "flex",
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
  button: {
    margin: 10,
    paddingTop: 20,
  },
  card: {
    maxWidth: 345,
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

  const [dbGuideMapData, setDbGuideMapData] = useState([]);

  useEffect(() => {
    getGuidemapApi()
      .then((res) => {
        setDbGuideMapData(...dbGuideMapData, res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }, []);

  const updateGuideMapDB = (newData) => {
    setDbGuideMapData([...dbGuideMapData, newData]);
  };

  const getMapDBByLocationId = (locationId) => {
    if (dbGuideMapData != undefined) {
      return dbGuideMapData.find((data) => data.location_id === locationId);
    } else {
      return null;
    }
  };

  const updateMapDBByLocationId = (locationId, newData, type) => {
    let index = dbGuideMapData.findIndex(
      (data) => data.location_id === locationId
    );

    switch (type) {
      case "RATING":
        dbGuideMapData[index].rating = newData;
        break;
      case "LIKE":
        dbGuideMapData[index].like_user = newData;
        break;
      default:
        console.log("none");
    }

    setDbGuideMapData(dbGuideMapData);
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

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Grid container id="back-to-top-anchor">
          <div className={classes.flexContainer}>
            <MapModalInput
              updateGuideMapDB={updateGuideMapDB}
              userData={props.userData}
            />
            <h3 style={{ marginLeft: 30, marginBottom: 20, marginTop: 50 }}>
              <span style={{ verticalAlign: "middle" }}>場地</span>
              <img
                src={skateboardMarker}
                style={{ height: 32, verticalAlign: "middle" }}
              />
              <span style={{ marginLeft: 20, verticalAlign: "middle" }}>
                店家
              </span>
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
            {dbGuideMapData.map((data, index) =>
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
                    {/* <img
                        src={placeunlike}
                        alt="placeunlike"
                        style={{ height: 32, zIndex: 500 }}
                        onClick={() =>
                        addtoFavorite(mapMarker.selectedLocation.name)
                      }
                      />
   
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() =>
                        addtoFavorite(mapMarker.selectedLocation.name)
                      }
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
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
      <Container component="main" maxWidth="lg">
        <Grid container>
          <MapList
            dbGuideMapData={dbGuideMapData}
            updateGuideMapDB={updateGuideMapDB}
            userData={props.userData}
            updateGroupUserDB={props.updateGroupUserDB}
            getMapDBByLocationId={getMapDBByLocationId}
            updateMapDBByLocationId={updateMapDBByLocationId}
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
