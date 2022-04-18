const {Router} = require('express');
const Arhiv = require('../models/Arhiv');
const router = Router();
const auth = require("../middleware/auth.middleware");
const removeDooble = async (Vcs)=>{
  let max = Vcs.length;
  for(let i = 0; i < max; i++){
    if ((Vcs[i].date===Vcs[i+1].date)&&(Vcs[i].time===Vcs[i+1].time)&&(Vcs[i].room===Vcs[i+1].room)&& (Vcs[i].password===Vcs[i+1].password)&&(Vcs[i].admin===Vcs[i+1].admin)   ){
      await Vcs[i+1].remove();
      max = Vcs.length;
    }
  }
}
router.get('/all',auth,async(req,res)=>{
  
  try {
    
    const vcs = await Arhiv.find({}).sort({'year':-1}).sort({'month':-1}).sort({'day':-1}).sort('time');
    res.json(vcs);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;