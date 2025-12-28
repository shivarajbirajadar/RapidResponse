const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
    title:{type:String, required:true},
    type:{type:String,require:true},
    description:String,
    location:{address:String,lat:Number,
    lng:Number},
    image:String,
    status:{type:String,default:"open"},
    verified:{type:Boolean, default:false},
    severity:{type:String,default:"Normal"},
    createdAt:{type:Date,default:Date.now}

});

module.exports = mongoose.model("Incident",incidentSchema);