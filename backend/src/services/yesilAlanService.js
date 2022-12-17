const yesilAlanSchema = require("../models/yesilAlan");
const data = require("./yesilAlanData.js");

const getYesilAlan = async (id) => {
  var obje= yesilAlanSchema.findById(id);
  return obje;
}

const getYesilAlanList = async (query) => {
  var {min,max,ilce}= query; 
  let filter ={}
  if(ilce){
    let COUNTY_NAME = ilce.toString().toLocaleUpperCase('tr-TR');
    filter = {COUNTY_NAME:COUNTY_NAME}
    
  }
  var obje= yesilAlanSchema.find(filter).limit(max-min+1).then(result=>{
    if(result){
      return result.map((element)=>{return {type:"Feature",properties:{...element._doc},geometry:{type:"Point",coordinates:[element.LONGITUDE,element.LATITUDE]}}});
    }
  }).catch( err => { return err;  });
  return obje;
}

const bulkInsertYesilAlan = async () => {

  for(let i =0 ; i < data.length ; i++) {
    
    var record = {
      _id: data[i][0],
      NAME: data[i][1],
      LONGITUDE:data[i][2],
      LATITUDE: data[i][3],
      NEIGHBORHOOD_NAME: data[i][4],
      COUNTY_NAME: data[i][5],
    };
    console.log(record);
    try {
      const res = await yesilAlanSchema.create(record);
      
      
    } catch (error) {
      console.error(error);
      
      return error;
    }
  }
  return true;
  

  
};
const updateYesilalan = async (data) =>{
  const obje =  yesilAlanSchema.findOneAndUpdate({"_id":data._id},data).then(()=>{
    return getYesilAlan(data._id)
  })
  return obje
}

module.exports = { bulkInsertYesilAlan,getYesilAlan,getYesilAlanList,updateYesilalan};

