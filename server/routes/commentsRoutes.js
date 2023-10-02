const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/commentsCtrl');

router.post('/create/:postId', commentsCtrl.create);
router.put('/:id', commentsCtrl.update);
router.delete('/:id', commentsCtrl.delete);
router.get('/get-all/:postId', commentsCtrl.getAllComments);

module.exports = router;