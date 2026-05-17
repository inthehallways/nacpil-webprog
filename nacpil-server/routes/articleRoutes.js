const express = require('express');

const {
    getArticles,
    getArticleByName,
    createArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);
router.route('/name/:name').get(getArticleByName);
router.route('/:id').put(updateArticle).delete(deleteArticle);

module.exports = router;
