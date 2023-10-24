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
    await models.Posts.findAll({})
      .then((posts) => {
        return res.status(200).json(posts);
      })
      .catch((e) => {
        return res.status(400).json({ message: "une erreur est survenue." });
      });
  },
  // get one post
  getOnePost: async (req, res) => {
    const postId = req.params.id;
    // console.log("---postId-****--", postId);
    await models.Posts.findOne({
      attributes: [
        "id",
        "title",
        "description",
        "cookingtime",
        "img",
        "users_idusers",
      ],
      where: { id: postId },
    })
      .then((post) => {
        // console.log("post----*", post);
        return res.status(200).json({ post });
      })
      .catch((e) => {
        return res.status(400).json({ message: "Post pas trouvé" });
      });
  },

  getPostsByUser: async (req, res) => {
    // console.log("rentre tu ici -----------------");
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);
    console.log("userId----", userId);

    await models.Posts.findAll({
      where: { users_idusers: userId },
    })
      .then((posts) => {
        // console.log("posts----ss", posts);
        return res.status(200).json(posts);
      })
      .catch((e) => {
        return res.status(400).json({ message: "Posts pas trouvés" });
      });
  },

  update: async (req, res) => {
    const id = req.params.id;
    const { title, description, cookingtime } = req.body;
    const image = req.file; // utilisation de cette variable pour la modification de l'image

    if (title === "" && description === "" && image === null) {
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
        "users_idusers",
      ],
      where: { id },
    });

    if (post) {
      post.title = title || post.title;
      post.description = description || post.description;
      post.cookingtime = cookingtime || post.cookingtime;
      post.img = image ? image.filename : post.img;
  
      await post.save();
  
      return res.status(200).json({ message: "Post mis à jour." });
    } else {
      return res.status(500).json({ message: "Post non trouvé." });
    }
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
        "users_idusers",
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
