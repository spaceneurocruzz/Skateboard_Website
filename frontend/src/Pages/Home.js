import React from "react";
import banner from "../imgs/index.jpg";
//import skatespace from "../imgs/skatespace.gif";
import "../css/app.css";

const Home = () => {
  return (
    <div className="banner_conatainer">
      <img src={banner} alt="banner" />
      {/* <img src={banner} alt="banner" /> */}
    </div>
  );
};

export default Home;
