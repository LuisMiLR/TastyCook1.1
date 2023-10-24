const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

router.post('/comments/create/:postId', commentsCtrl.create);
router.put('/comments/edit/:id', commentsCtrl.update);
router.delete('/comments/delete/:id', commentCtrl.delete);
router.get('/comments/:postId', commentCtrls.getAllComments);

module.exports = router;
