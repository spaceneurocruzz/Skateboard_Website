import React, { useState } from "react";
import "../css/app.css";
import indexman from "../imgs/indexman.jpg";

const Home = () => {
  const [sbGo, setSbGo] = useState("");

  setTimeout(() => {
    setSbGo("Let's Go Skateboarding Together!");
  }, 1500);

  return (
    <div className="user_conatainer">
      <div style={{ display: "flex" }}>
        <div>
          <img
            className="lefttoright"
            src={indexman}
            alt="banner"
          />
        </div>
        <div
          id="sbgo"
          style={{
            fontFamily: "Galindo",
            marginTop: "auto",
            marginBottom: "auto",
            fontSize: 60,
            fontWeight: 900,
            marginLeft: 200,
          }}
        >
          {sbGo}
        </div>
      </div>
    </div>
  );
};

export default Home;
