const mongoose = require('mongoose')

const idcardSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    rollno : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
    }
})

const idcard = mongoose.model('idcard',idcardSchema)

module.exports = idcard