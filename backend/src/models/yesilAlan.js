const moongose = require("mongoose");


const YesilAlanSchema = moongose.Schema({
    _id : {
        type: Number
    },
    LONGITUDE : {
        type: Number
    },
    LATITUDE :{
        type: Number
    },
    NAME :{
        type:String
    },
    NEIGHBORHOOD_NAME : {
        type : String
    },
  
    
})

module.exports = moongose.model("YesilAlan",YesilAlanSchema);