var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    facebookid : String,
    name : String,
    token : String,
    picture : String,
    work : [String],
    education : [String],
    place : String,
    contact : {
        mobile : String,
        email : String,
    },
    basic_info : {
        birthdate: Date,
        gender : String,
    },
    summary: String
})

module.exports = mongoose.model('User',userSchema);