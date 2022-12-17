var router = require('express').Router();
const {bulkInsertYesilAlan,getYesilAlan,getYesilAlanList,updateYesilalan} = require('../services/yesilAlanService');

router.get('/bulkinsert', async function(req, res, next)  {
  res.status(200).json(await bulkInsertYesilAlan());
  next();
});

router.get('/yesilalan/:id', async function(req, res, next)  {
  res.status(200).json(await getYesilAlan(req.params.id));
  next();
});

router.get('/yesilalans', async function(req, res, next)  {
  res.status(200).json(await getYesilAlanList(req.query));
  next();
});
router.put('/updateYesilalan',async  function(req,res,next){
  res.status(200).json(await updateYesilalan(req.body))
  next();
})

module.exports = router;