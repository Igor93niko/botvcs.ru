const { Router } = require("express");
const UserBot  = require("../models/UsersBot");
const router = Router();
const auth = require("../middleware/auth.middleware");
router.get('/all',auth,async(req,res)=>{
  try {
    const user = await UserBot.find({}).sort('room');
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id',auth,async(req,res)=>{
  try {
    const user = await UserBot.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});
router.get('/delete/:id',auth,async(req,res)=>{
  try {
    const user = await UserBot.findById(req.params.id);
    await user.remove();
    const users = await UserBot.find({});
    res.status(202).json(users);
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так'});
  }
});

router.post('/create',auth,async(req,res)=>{
  try {
  const user = new UserBot({
    username:req.body.username,id:req.body.id
  })
  await user.save();
  const users = await UserBot.find({});
  res.status(201).json(users);
} catch (error) {
  res.status(500).json({message:'Что-то пошло не так'}); 
}

});
router.post('/edit',auth,async(req,res)=>{
const username = req.body.username;
const id = req.body.id;
  try {
    let user = await UserBot.findById(req.body._id);
    user.username= username;
    user.id = id;
    await user.save();
    const newuser = await UserBot.find({});
    res.status(202).json(newuser);
  } catch (error) {
    res.status(500).json('Что-то пошло не так');  
  }
})

module.exports = router;