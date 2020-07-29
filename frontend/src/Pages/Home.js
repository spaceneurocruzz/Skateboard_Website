import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import banner from "../imgs/index.jpg";
import "../css/app.css";
import indexman from "../imgs/indexman.jpg";
import indexmanstand from "../imgs/indexmanstand.jpg";
// import young from "../imgs/30419.jpg";
import indexsb from "../imgs/indexsb.jpg";

import { Player } from "video-react";
import { Link, NavLink } from "react-router-dom";

const Welcome = ({ stickyRef }) => (
  <main>
    <section className="welcome">
      <div ref={stickyRef}>
        <img
          src="../imgs/skateboardLogo.png"
          alt="logo"
          className="welcome--logo"
        />
        <p>Even if you scroll, i will stick with you</p>
        <button className="welcome__cta-primary">Contact us</button>
      </div>
    </section>
    <NavLink to="/guidemap">
      <div
        className="circle"
        style={{
          alignItems: "center",
          zIndex: 2,
          fontSize: 30,
          alignItems: "left",
          marginLeft: 100,
          marginTop: 200,
        }}
      >
        滑板地圖
      </div>
    </NavLink>
    <About />
    <About />
  </main>
);

const Home = () => {
  const [state, setState] = useState("spin");
  const toRight = () => {
    setState("lefttoright");
  };
  const [sbGo, setSbGo] = useState("");

  setTimeout(()=>{
    setSbGo("SkateboardGO");
  }, 1500)

  const [slogan, setSlogan]= useState("");

  setTimeout(()=>{
    setSlogan("來揪團吧！");
  }, 1500)

  // const [img, setImg]= useState("");

  // setTimeout(()=>{
  //   setImg(`${indexmanstand}`);
  // }, 1500)

  return (
    // <div
    //   className="banner_conatainer"
    //   style={{ marginTop: 30, height: "100%" }}
    // >
    <div className="user_conatainer">
      <div style={{ display: "flex" }}>
        {/* <NavLink to="/guidemap">
          <div
            className="circle"
            style={{
              alignItems: "center",
              zIndex: 2,
              fontSize: 30,
              alignItems: "left",
              marginLeft: 100,
              marginTop: 200,
            }}
          >
            滑板地圖
          </div>
        </NavLink> */}
        {/* <div
          className="circle2"
          style={{ textAlign: "center", zIndex: 2, fontSize: 30,position:'fixed',bottom:100 }}
        >
          揪團
        </div>
      </div>
    </> */}
        {/* <span
          id="slogan"
          style={{
            fontFamily: "Galindo",
            // marginTop: "auto",
            // marginBottom: "auto",
            fontSize: 50,
            fontWeight: 900,
          }}
        >
          {slogan}
        </span> */}
        {/* <img
          // className="lefttoright"
          //className={state}
          src={img}
          style={{
            height: 500,
            width: "auto",
            marginTop: 50,
            marginBottom: 70,
            marginRight: 20,
            // marginRight: "auto",
            // marginLeft: "auto",
            zIndex: 2,
          }}
          alt="banner"
        /> */}
        <div>
        <img
          className="lefttoright"
          //className={state}
          src={indexman}
          style={{
            height: 500,
            width: "auto",
            marginTop: 50,
            marginBottom: 70,
            marginLeft: 20,
            // marginRight: "auto",
            // marginLeft: "auto",
            //zIndex: 2,
          }}
          alt="banner"
        />
        </div>
        <div
          id="sbgo"
          style={{
            fontFamily: "Galindo",
            marginTop: "auto",
            marginBottom: "auto",
            fontSize: 80,
            fontWeight: 900,
            marginLeft:300
          }}
        >
          {sbGo}
        </div>
        {/* <NavLink to="/friendsgroup">
          <div
            className="circle2"
            onClick={toRight}
            style={{
              textAlign: "center",
              zIndex: 2,
              fontSize: 30,
              marginRight: 100,
              marginTop: 200,
            }}
          >
            揪團
          </div>
        </NavLink> */}
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
    </div>
    /* <img src={banner} alt="banner" />  
     {/* </div> */
  );
};

export default Home;
