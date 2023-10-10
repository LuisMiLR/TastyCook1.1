import axios from "axios";
import env from "react-dotenv";


//register 
export const registerUser = async (data) => {
  

  await axios({
    method: "post",
    url: `${env.API_URL}/user/register`,
    data: data,
    
  })
  console.log("-------",data)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

//login
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

//logout
export const logoutUser = (res) => {
  localStorage.removeItem("token");
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
      return res.data.user
    })
    .catch((e) => {
      console.log(e.response.data.error);
    });
};


