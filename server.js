const express = require('express');
const app = express();

const PostModel = require('./models/post');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/api/posts',async (req,res)=>{
    const post = new PostModel(req.body)
    try{
        const data = await post.save()
        console.log(data);
        res.send({
            code:0,
            msg:'ok'
        })
         }catch(error){
            console.log(error);
            res.send({
                code:-1,
                msg:'no'
            })
    }

})

app.get('/api/posts',async (req,res)=>{
    let pageNum = parseInt(req.query.pageNum)||1
    let pageSize = parseInt(req.query.pageSize)||3
    let title = req.query.title;


    const posts = await PostModel.find({title:new RegExp(title)})
    .skip((pageNum-1)*pageSize)
    .limit(pageSize)

    const count = await PostModel.find({
        title:new RegExp(title)
    }).countDocuments()

    res.send({
        code:0,
        msg:'ok',
        data:{
            list:posts,
            count
        }
    })
})

app.listen(8080);