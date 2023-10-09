const jwtUtils = require("../middleware/jwtUtils");
const models = require("../models");

module.exports = {
  create: async (req, res) => {
    const { title, description, cookingtime, img, users_idusers } = req.body;
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);
    const image = req.file;
    
    if (!title || !description) {
      return res
      .status(500)
      .json({ message: "Veuillez remplir tous les champs." });
    }
    
    const newPost = await models.Posts.create({
      title: title,
      description: description,
      cookingtime: cookingtime,
      img: image ? image.filename : "test.png",
      users_idusers: userId,
    });
    
    if (newPost) {
      return res
      .status(200)
      .json({ message: "Posts a été crée.", post: newPost });
    } else {
      return res.status(400).json({ message: "Erreur" });
    }
  },
  
  getAllPosts: async (req, res) => {
    console.log("------postCtrl 1------",res);
    await models.Posts.findAll({
      
    })
    .then((posts) => {
      console.log("------thenPost----", posts);
      return res.status(200).json(posts);
    })
    .catch((e) => {
      return res.status(400).json({ message: "une erreur est survenue." });
    });
  },

  getOnePost: async (req, res) => {
    const postId = req.params.id;
    await models.Posts.findOne({
      where: { id: postId },
      attributes: [
        "id",
        "title",
        "description",
        "cookingtime",
        "img",
        "users_id",
      ],
    })
      .then((post) => {
        return res.status(200).json({ post: post });
      })
      .catch((e) => {
        return res.status(400).json({ message: "Post pas trouvé" });
      });
  },

  getPostsByUser: async (req, res) => {
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);

    await models.Posts.findAll({
      where: { users_idusers: userId },
      attributes: [
        "id",
        "title",
        "description",
        "cookingtime",
        "img",
        "users_idusers",
      ],
    })
      .then((posts) => {
        return res.status(200).json(posts);
      })
      .catch((e) => {
        return res.status(400).json({ message: "Posts pas trouvés" });
      });
  },
  
  update: async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const image = req.file;

    if (title === "" && description === "" && img === null) {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const post = await models.Posts.findOne({
      attributes: [
        "id",
        "title",
        "description",
        "cookingtime",
        "img",
        "users_id",
      ],
      where: { id },
    });

    await post
      .update({
        title: title ? title : post.title,
        description: description ? description : post.description,
        cookingtime: cookingtime ? cookingtime : post.cookingtime,
        img: image ? image.filename : post.img,
      })
      .then((post) => {
        return res
          .status(200)
          .json({ message: "modification effectué", post: post });
      })
      .catch((e) => {
        return res
          .status(400)
          .json({ message: "erreur lors de la modification" });
      });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const post = await models.Posts.findOne({
      attributes: [
        "id",
        "title",
        "description",
        "cookingtime",
        "img",
        "users_id",
      ],
      where: { id },
    });

    if (post) {
      await models.Posts.destroy({
        where: { id: id },
      })
        .then(() => {
          return res.status(200).json({ message: "post supprimé" });
        })
        .catch((e) => {
          return res
            .status(400)
            .json({ message: "erreur lors e la suppression" });
        });
    }
  },
};