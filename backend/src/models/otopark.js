const moongose = require("mongoose");


const OtoparkSchema = moongose.Schema({
    _id : {
        type: Number
    },
    PARK_NAME :{
        type:String
    },
    LOCATION_NAME: {
        type :String
    },
    PARK_TYPE_ID : {
        type : String
    },
    PARK_TYPE_DESC : {
        type :String
    },
    CAPACITY_OF_PARK : {
        type: Number
    },
    WORKING_TIME : {
        type: String
    },
    COUNTY_NAME : {
        type : String
    },
    LONGITUDE : {
        type: Number
    },
    LATITUDE :{
        type: Number
    }
    
})

module.exports = moongose.model("Otopark",OtoparkSchema);