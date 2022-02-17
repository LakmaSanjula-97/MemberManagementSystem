const mongoose = require('mongoose')


//member model
//member schema 
const memberSchema = new mongoose.Schema({
    member_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    
    country:{
        type: String,
        required: true
    },
    // date:{
    //     type: String,
    //     required: true
    // },
    checked:{
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
})


module.exports = mongoose.model("Members", memberSchema)