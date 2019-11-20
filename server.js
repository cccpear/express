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

app.listen(8080);