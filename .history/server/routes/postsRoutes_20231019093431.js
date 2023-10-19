const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/postsCtrl");
const { imageUpload } = require("../middleware/multerConfig");

router.post("/create", imageUpload.single("img"), postsCtrl.create);
router.put("/:id", imageUpload.single("image"), postsCtrl.update);
router.delete("/:id", postsCtrl.delete);
router.get("/get-all", postsCtrl.getAllPosts);
router.get("/one/:id", postsCtrl.getOnePost);
router.get("/get-all-posts-user", postsCtrl.getPostsByUser);

module.exports = router;
