const express=require('express');
const router=express.Router();
//import auth middleware

const Auth=require('../middleware/is-auth');

//importing controllers
const articlesController=require('../controllers/article');

router.post('/articles',Auth,articlesController.postArticle);
router.get('/feeds',Auth,articlesController.getAllArticles);
router.delete('/article/:articleId',Auth,articlesController.deleteArticle);
module.exports=router;