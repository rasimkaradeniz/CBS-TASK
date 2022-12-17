const otoparkSchema = require('./../models/otopark');
const data = require("./otoparkData.js");
const bulkInsertOtopark = async () => {
  for(let i =0 ; i < data.length ; i++) {
    
    var record = {
      _id: data[i][0],
      PARK_NAME: data[i][1],
      LOCATION_NAME:data[i][2],
      PARK_TYPE_ID: data[i][3],
      PARK_TYPE_DESC: data[i][4],
      CAPACITY_OF_PARK: data[i][5],
      WORKING_TIME: data[i][6],
      COUNTY_NAME: data[i][7],
      LONGITUDE: data[i][8],
      LATITUDE: data[i][9],
    };
    console.log(record);
    try {
      const res = await otoparkSchema.create(record);
      
      
    } catch (error) {
      console.error(error);
      
      return error;
      // handle the error
    }
  }
  return true;
}

const getOtopark = async (id) => {
  var obje= otoparkSchema.findById(id);
  return obje;
}

const getOtoparkList = async (query) => {
  let {min,max,ilce}= query; 
  let filter ={}
  if(ilce){
    let COUNTY_NAME = ilce.toString().toLocaleUpperCase('tr-TR');
    filter = {COUNTY_NAME:COUNTY_NAME}
  }

    let obje= otoparkSchema.find(filter).limit(max-min+1).then(result=>{
      if(result){
        return result.map((element)=>{return {type:"Feature",properties:{...element._doc},geometry:{type:"Point",coordinates:[element.LONGITUDE,element.LATITUDE]}}});
      }
    }).catch( err => { return err;  });
    return obje;
  }

const updateOtopark = async (data) =>{
  const obje =  otoparkSchema.findOneAndUpdate({"_id":data._id},data).then(()=>{
    return getOtopark(data._id)
  }).catch(err => {return err;} )
  
  return obje
}
  
module.exports = {bulkInsertOtopark,getOtopark,getOtoparkList,updateOtopark};