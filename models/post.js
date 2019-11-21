const mongoose = require('../conf/db');

const schema = new mongoose.Schema({
    title:{type:String,
    required:true
    },

    body:{type:String,
    require:true
    }
})



const model =  mongoose.model('post',schema);


module.exports = model;