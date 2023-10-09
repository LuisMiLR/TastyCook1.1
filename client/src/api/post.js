import axios from "axios";
import env from "react-dotenv";

//creation de la requette post pour la recette avec axios

export const createPost = async (data, token) => {
  return await axios({
    method: "post",
    url: `${env.API_URL}/post/create`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data.post;
    })
    .catch((e) => {
      console.log(e);
    });
};

//requette get pour toutes les recettes
export const getPosts = async () => {
  return await axios({
    method: "get",
    url: `${env.API_URL}/post/get-all`,
  })
    .then((posts) => {
      return posts;
    })
    .catch((e) => {
      console.log('error getting recipes',e);
    });
};

//requette delete recette
export const deletePost = async (postId) => {
  return await axios({
    method: "delete",
    url: `${env.API_URL}/post/${postId}`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

//requette update recette
export const updatePost = async (data, postId) => {
  return await axios({
    method: "put",
    url: `${env.API_URL}/post/${postId}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => {
      return res.data.post;
    })
    .catch((e) => {
      console.log(e);
    });
};

//requette get pour une recette par ID
export const getPostById = async (id) => {
  return await axios({
    method: "get",
    url: `${env.API_URL}/post/${id}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getPostsByUser = async (token) => {
  return await axios({
    method: "get",
    url: `${env.API_URL}/post/get-all-user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

