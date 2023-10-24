const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/commentsCtrl");

server.post('/comments/create/:postId', commentCtrl.create);
server.put('/comments/edit/:id', commentCtrl.update);
server.delete('/comments/delete/:id', commentCtrl.delete);
server.get('/comments/:postId', commentCtrl.getAllComments);

module.exports = router;
