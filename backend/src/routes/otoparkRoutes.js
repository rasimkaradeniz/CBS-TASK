var router = require('express').Router();
const {bulkInsertOtopark,getOtopark,getOtoparkList,updateOtopark} = require('../services/otoparkService');

router.get('/bulkinsert', async function(req, res, next)  {
  res.status(200).json(await bulkInsertOtopark());
  next();
});

router.get('/otopark/:id', async function(req, res, next) {
  res.status(200).json(await getOtopark(req.params.id));
  next();
})

router.get('/otoparks', async function(req, res, next) {
  res.status(200).json(await getOtoparkList(req.query));
  next();
})
router.put('/updateOtopark',async  function(req,res,next){
  res.status(200).json(await updateOtopark(req.body))
  next();
})

module.exports = router;