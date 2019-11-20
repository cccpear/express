const mongoose = require('../conf/db');

const schema = new mongoose.Schema({
    title:String,
    body:String
})



const model =  mongoose.model('post',schema);


module.exports = model;