import React from "react";
import "../../css/app.css";
import MapInfoWindow from "./MapInfoWindow";
import skateboardMarker from "../../imgs/skateboardMarker.png";

const MapMarker = (props) => {
  const { color, name, id } = props;

  // const showInfo=(e)=>{
  //   console.log("click")
  //   const infoWindow = new window.google.maps.InfoWindow({
  //     content: '<div id="infoWindow" />',
  //     position: { lat: props.lat, lng: props.lng }
  //   })
  //   infoWindow.addListener('domready', e => {
  //     render(<MapInfoWindow />, document.getElementById('infoWindow'))
  //   })
  //   infoWindow.open(map)
  // }

  return (
    <>
      <div
        className="marker"
        style={{ cursor: "pointer" }}
        title={name}
        // onClick={showInfo}
      ></div>
      <MapInfoWindow show={props.show} />
    </>
  );
};

export default MapMarker;
