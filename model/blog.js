const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        max: 255
    },
    message : {
        type : String,
        required : true,
    }
    
});

module.exports = mongoose.model('Blog' ,  blogSchema);