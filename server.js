const express = require('express');
const bcryptjs = require('bcryptjs');
const app = express();

const PostModel = require('./models/post');
const UserModel = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//新增文章
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
//查询文章
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
//删除文章
app.delete('/api/posts/:id',async (req,res)=>{
    let id = req.params.id;
    await PostModel.deleteOne({_id:id})
    res.send({
        code:0,
        msg:'ok'
    })
})
//修改文章
app.put('/api/posts/:id/update',async(req,res)=>{
    let id = req.params.id;
    let title = req.body.title;
    await PostModel.updateOne({_id:id},req.body)
    res.send({
        code:0,
        msg:'ok'
    })
})

//注册
app.post('/api/users',async (req,res)=>{

    let username = req.body.username;
    let password = req.body.password;

    password = await bcryptjs.hash(password,12);

    const users = new UserModel({
        username,
        password
    });
    await users.save();
    res.send({
        code:0,
        msg:'ok'
    });
})

//登陆
app.post('/api/login',async (req,res)=>{
   let username = req.body.username;
   let password = req.body.password; 
  const user = await UserModel.findOne({username});

  let isOk = false;
  if(user){
     isOk = await bcryptjs.compare(password,user.password);
}
  if(isOk){
    res.send({
        code:0,
        msg:'ok',
        data:{
            userId:user._id,
            username:user.username
        }
    })
    }else{
        res.send({
            code:-1,
            msg:'用户名或密码错误'
        })
    }
  
})

app.listen(8080);