const mongoose = require('../conf/db');


const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const model = mongoose.model('user',schema);
module.exports = model;