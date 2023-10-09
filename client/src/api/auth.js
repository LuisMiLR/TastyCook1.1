import axios from "axios";
import env from "react-dotenv";

export const registerUser = async (data) => {
  console.log(data);

  await axios({
    method: "post",
    url: `${env.API_URL}/user/register`,
    data: data,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const loginUser = async (data) => {
  return await axios({
    method: "post",
    url: `${env.API_URL}/user/auth`,
    data: data,
  })
    .then((res) => {
      const token = res.data.token;
      if (token != null) {
        localStorage.setItem("token", token);
        return token;
      }
    })
    .catch((e) => {
      console.log(e.response.data.error);
    });
};

//recuperer l'user connecté

export const getUserInfo = async (token) => {
  return await axios({
    method: "get",
    url: `${env.API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("---------res-------",res.data.user);
      return res.data.user
    })
    .catch((e) => {
      console.log(e.response.data.error);
    });
};
