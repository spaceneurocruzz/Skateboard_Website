import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

const SocialLogin = () => {
  // const [authData, setAuthData] = React.useState(initialState);
  
  const responseGoogle = (response) => {
    console.log(response)
    // send request to backend
    axios
      .post("http://127.0.0.1:8000/api/token/obtainGoogle/", {
        token: "Bearer" + response.tokenObj.access_token,
      })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return response;
      }).then((json)=>{
        dispatch({
          type: "LOGIN",
          payload: json
      })}
      ).
      then(()=>{
        history.push("/");
      })
      .catch(function (error) {
        // setAuthData({
        //   ...authData,
        //   isSubmitting: false,
        //   errorMsg: error.message || error.statusText
        // });
      });
  };
  return (
    <>
      <GoogleLogin
        clientId="150926167922-v60e6s4va6hqgbnaan1qia4tkqogbju6.apps.googleusercontent.com"
        buttonText="使用 Google 登入"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default SocialLogin;