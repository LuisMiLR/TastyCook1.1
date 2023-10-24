const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

.post('/comments/create/:postId', commentCtrl.create);
.put('/comments/edit/:id', commentCtrl.update);
.delete('/comments/delete/:id', commentCtrl.delete);
.get('/comments/:postId', commentCtrl.getAllComments);

module.exports = router;
