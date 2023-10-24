const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

router.post('/create/:postId', commentsCtrl.create);
router.put('/comments/edit/:id', commentsCtrl.update);
router.delete('/comments/delete/:id', commentsCtrl.delete);
router.get('/comments/:postId', commentsCtrl.getAllComments);

module.exports = router;
