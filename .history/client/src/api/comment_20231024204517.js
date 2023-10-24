import axios from "axios";
import env from "react-dotenv";

//function post comment
export const createComment = async (data, token) => {
  return await axios({
    method: "post",
    url: `${proenv.REACT_APP_API_URL}/comment/create`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.comment;
    })
    .catch((e) => {
      console.log(e);
    });
};

//function get comments by post id
export const getComments = async (postId) => {
  return await axios({
    method: "get",
    url: `${env.REACT_APP_API_URL}/comment/get-by-post/${postId}`,
  })
    .then((comments) => {
      return comments;
    })
    .catch((e) => {
      console.log("error getting comments", e);
    });
};

//function delete comment
export const deleteComment = async (commentId) => {
  return await axios({
    method: "delete",
    url: `${env.REACT_APP_API_URL}/comment/${commentId}`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

//function update comment
export const updateComment = async (data, commentId) => {
  return await axios({
    method: "put",
    url: `${env.REACT_APP_API_URL}/comment/edit/${commentId}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data.comment;
    })
    .catch((e) => {
      console.log(e);
    });
};
