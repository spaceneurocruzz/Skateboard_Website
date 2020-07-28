import React, { useState } from "react";
import banner from "../imgs/index.jpg";
import "../css/app.css";
import indexman from "../imgs/indexman.jpg";
import indexmanstand from "../imgs/indexmanstand.jpg";
// import young from "../imgs/30419.jpg";
import indexsb from "../imgs/indexsb.jpg";

import { Player } from "video-react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  const [state, setState] = useState("spin");
  const toRight = () => {
    setState("lefttoright");
  };

  // const toRight = () => {
  //   setState("lefttoright");
  // };

  return (
    // <div
    //   className="banner_conatainer"
    //   style={{ marginTop: 30, height: "100%" }}
    // >
    <>
      {/* <video id="background-video" loop autoPlay muted style={{position:'fixed',bottom:100 }}>
        <source src={bg} type="video/mp4" />
      </video> */}
      {/* <div id="background"></div> */}
      <div style={{ marginLeft: 20, display: "flex" }}>
        <NavLink to="/guidemap">
          <div
            className="circle"
            style={{
              alignItems: "center",
              zIndex: 2,
              fontSize: 30,
              alignItems: "left",
              marginLeft: 100,
              marginTop:200
            }}
          >
            滑板地圖
          </div>
        </NavLink>
        {/* <div
          className="circle2"
          style={{ textAlign: "center", zIndex: 2, fontSize: 30,position:'fixed',bottom:100 }}
        >
          揪團
        </div>
      </div>
    </> */}
        <img
          className={state}
          src={indexman}
          style={{
            height: 500,
            width: "auto",
            marginTop:50,
            marginBottom: 70,
            marginRight: "auto",
            marginLeft: "auto",
            zIndex: 2,
          }}
          alt="banner"
        />
        <NavLink to="/friendsgroup">
          <div
            className="circle2"
            onClick={toRight}
            style={{
              textAlign: "center",
              zIndex: 2,
              fontSize: 30,
              marginRight: 100,
              marginTop:200
            }}
          >
            揪團
          </div>
        </NavLink>
        {/* <img className="spin"
           src={indexsb}
           style={{
             height: 500,
             width: "auto",
             marginBottom: 70,
             marginRight: 100,
           }}
           alt="banner"
         />  */}
        {/* <img
          src={indexman}
          style={{
            height: 500,
            width: "auto",
            marginBottom: 70,
            marginLeft: 100,
          }}
          alt="banner"
        /> */}
      </div>
    </>
    /* <img src={banner} alt="banner" />  
     {/* </div> */
  );
};

export default Home;
