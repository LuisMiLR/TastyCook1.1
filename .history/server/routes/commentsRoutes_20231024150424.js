const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

router.post('/comments/create/:postId', commentCtrl.create);
router.put('/comments/edit/:id', commentCtrl.update);
router.delete('/comments/delete/:id', commentCtrl.delete);
router.get('/comments/:postId', commentCtrl.getAllComments);

module.exports = router;
