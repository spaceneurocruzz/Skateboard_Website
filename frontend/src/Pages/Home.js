import React, { useState } from "react";
import "../css/app.css";
import indexman from "../imgs/indexman.jpg";

import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const [sbGo, setSbGo] = useState("");

  setTimeout(() => {
    setSbGo("Let's Go Skateboarding Together!");
  }, 1500);

  return (
    <div className="user_conatainer">
      <div style={{ display: "flex" }}>
        <div>
          <img className="lefttoright" src={indexman} alt="banner" />
        </div>
        <div
          id="sbgo"
          style={{
            fontFamily: "Galindo",
            marginTop: "auto",
            marginBottom: "auto",
            fontSize: 60,
            fontWeight: 900,
            // marginLeft: 200,
          }}
        >
          {sbGo}
        </div>
      </div>
      <div
        className="forsmallscreen"
        style={{
          fontFamily: "Galindo",
          marginTop: "auto",
          marginBottom: "auto",
          fontSize: 25,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        {sbGo}
      </div>
      {/* <div style={{ display: "flex" }}>
        <NavLink to="/guidemap">
          <div
            className="circle"
          >
            滑板地圖
          </div>
        </NavLink>
        <NavLink to="/guidemap">
          <div
            className="circle2"
          >
            揪團
          </div>
        </NavLink>
      </div> */}
    </div>
  );
};

export default Home;
