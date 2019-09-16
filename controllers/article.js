var articles=[];
exports.getAllArticles=(req,res,next)=>{
    const datas=articles.map(a=>{
        return {
            id:a.id,
            createdOn:a.createdOn,
            title:a.title,
            article:a.article,
            authorId:a.authorId
        }
    })
    res.status(200).json({
        status:200,
        data:datas
    })
}
exports.postArticle=(req,res,next)=>{
    const id=new Date().toISOString();
    const title=req.body.title;
    const article=req.body.article;
    const createdOn=new Date();
    const updatedOn=new Date();
    const user=req.user;
    const newarticle={
        id:id,
        title:title,
        article:article,
        createdOn:createdOn,
        updatedOn:updatedOn,
        authorId:user.id
    }
    articles.push(newarticle);
    res.status(201).json({
       status:201,
       message:'article successfully created',
       data:{
           createdOn:createdOn,
           title:title,
           article:article,
           editor:req.user
       }
    });
}
exports.deleteArticle=(req,res,next)=>{
    const articleId=req.params.articleId;
    const articleIndex=articles.findIndex(a=>{
        return a.id===articleId && a.authorId===req.user.id;
    });
    if(!articleIndex){
        return res.status(500).json({
            message:"unauthorized access"
        })
    }
    articles=articles.slice(articleIndex,1);
    res.status(200).json({
        message:'article deleted'
    })

}