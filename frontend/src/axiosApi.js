import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const friendsGroupAxiosInstance = axios.create({
  baseURL: `/api/friends/`,
});

const mapAxiosInstance = axios.create({
  baseURL: `api/map/`,
});

const userAxiosInstance = axios.create({
  baseURL: `api/user/`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops early
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err.response);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }
    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export const userSignupApi = (data) => {
  return axiosInstance.post("/user/create/", data);
};

export const loginApi = (data) => {
  return axiosInstance.post("/token/obtain/", data);
};

export const logoutApi = (data) => {
  return axiosInstance.post("/blacklist/", data);
};

export const getUserApi = (username) => {
  return userAxiosInstance.get(`get/username=${username}`);
};

export const getAllUsersApi = () => {
  return axiosInstance.get(`user/`);
};

export const getByUserListApi = (usernameList) => {
  return axiosInstance.get(`user?username=${usernameList}`);
};

export const patchUserApi = (username, data) => {
  return userAxiosInstance.patch(`update/username=${username}`, data);
};

export const getGuidemapApi = () => {
  return mapAxiosInstance.get("guideMap/");
};

export const postGuidemapApi = (data) => {
  return mapAxiosInstance.post(`guideMap/`, data);
};

export const patchGuidemapApi = (location_id, data) => {
  return mapAxiosInstance.patch(`guideMap/${location_id}/`, data);
};

export const getGuideMapCommentsApi = () => {
  return mapAxiosInstance.get(`guideMapComments/`);
};

export const postGuideMapCommentsApi = (data) => {
  return mapAxiosInstance.post(`guideMapComments/`, data);
};

export const getFriendsGroupApi = () => {
  return friendsGroupAxiosInstance.get(`friendsGroup/`);
};

export const postFriendsGroupApi = (data) => {
  return friendsGroupAxiosInstance.post(`friendsGroup/`, data);
};

export const patchFriendsGroupApi = (group_id, data) => {
  return friendsGroupAxiosInstance.patch(`friendsGroup/${group_id}/`, data);
};

export const getFriendsGroupCommentsApi = () => {
  return friendsGroupAxiosInstance.get(`friendsGroupComments/`);
};

export const postFriendsGroupCommentsApi = (data) => {
  return friendsGroupAxiosInstance.post(`friendsGroupComments/`, data);
};

export default axiosInstance;
