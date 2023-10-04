const jwtUtils = require("../middleware/jwtUtils");
const models = require("../models");

module.exports = {
  create: async (req, res) => {
    const { content } = req.body;
    const authorization = req.headers["authorization"];
    const userId = jwtUtils.getUser(authorization);
    const postId = req.params.postId;

    if (content == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const newComment = await models.Comments.create({
      descripcomment: content,
      posts_id: postId,
      users_id: userId,
    });

    if (newComment) {
      return res
        .status(200)
        .json({ message: "Commentaire a été crée.", comment: newComment });
    } else {
      return res.status(400).json({ message: "Erreur" });
    }
  },

  update: async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;

    if (content === "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }

    const comment = await models.Comments.findOne({
      where: { id: commentId },
    });

    await comment
      .update({
        content: content ? content : comment.content,
      })
      .then((comment) => {
        return res
          .status(200)
          .json({ message: "modification effectué", comment: comment });
      })
      .catch((e) => {
        return res
          .status(400)
          .json({ message: "erreur lors de la modification" });
      });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const comment = await models.Comments.findOne({
      where: { id: id },
    });

    if (comment) {
      await models.Comments.destroy({
        where: { id: id },
      })
        .then(() => {
          return res.status(200).json({ message: "post supprimé" });
        })
        .catch((e) => {
          return res
            .status(400)
            .json({ message: "erreur lors de la suppression" });
        });
    }
  },

  getAllComments: async (req, res) => {
    const postId = req.params.postId;

    await models.Comments.findAll({
      where: { posts_id: postId },
      include: [
        {
          model: models.Users,
          required: true,
        },
      ],
    })
      .then((comments) => {
        return res.status(200).json({ comments: comments });
      })
      .catch((e) => {
        return res.status(400).json({ message: "une erreur est survenue." });
      });
  },
};
