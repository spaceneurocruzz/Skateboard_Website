import axios from "axios";
import adapter from "axios/lib/adapters/http";

test("Test API", () => {
  return axios({
    method: "get",
    baseURL: "http://localhost:8000/api/",
    url: "user/get/username=TheFlash",
    headers: {
      "content-type": "application/json",
    },
    adapter,
  }).then((response) => {
    expect(response.data).toBeDefined();
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("username");
    expect(response.data).toEqual({
      id: 17,
      email: "flash@flash.com",
      username: "TheFlash",
      last_login: null,
      location: "",
      intro: "",
      nickname: "TheFlash",
      avatar: "/media/avatar/3443681-flash1_AmKXbrM.gif",
      group_create: null,
      group_join: [5, 4, 14, 15],
      group_like: [6, 7],
      map_create: null,
      map_like: [56],
      map_add: null,
      map_comment: null,
    });
  });
});
