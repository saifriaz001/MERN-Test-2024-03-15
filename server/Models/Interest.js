 
 const mongoose = require('mongoose');

 const interestSchema  = new mongoose.Schema({
    category:[{
        type:String,
    }]
 });

const Interest = mongoose.model('Interest' , interestSchema);
module.exports = Interest;