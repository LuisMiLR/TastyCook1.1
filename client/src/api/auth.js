import axios from 'axios';
import env from 'react-dotenv'

export const registerUser = async (data) => {
   
   console.log("------------1", data);
   // console.log("------------2",env.API_URL);

   await axios({
      method: 'post',
      url: `${env.API_URL}/user/register`,
      data: data
   })
      .then((res) => {
         if (res.status === 200) {
            return res.data
         }
      })
      .catch((e) => {
         console.log(e);
      })
   }

   export const loginUser = async (data) => {
      return await axios({
          method: 'post',
          url: `${env.API_URL}/user/auth`,
          data: data
       })
       .then((res) => {
         const token = res.data.token;
          if (token != null) {
              localStorage.setItem('token', token);
              return token;
          }
       })
       .catch((e) => {
          console.log(e.response.data.error);
       }) 
  }