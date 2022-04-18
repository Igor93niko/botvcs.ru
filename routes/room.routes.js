const { Router } = require("express");
const Room  = require("../models/Room");
const router = Router();
const auth = require("../middleware/auth.middleware");
router.get('/all',auth,async(req,res)=>{
  try {
    const room = await Room.find({}).sort('room');
    res.json(room);
  } catch (error) {
    res.json(error);
  }
});
router.get('/:id',auth,async(req,res)=>{
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    res.json(error);
  }
});

router.get('/delete/:id',auth,async(req,res)=>{
  if (req.rolles==='admin'){
  try {
    const room = await Room.findById(req.params.id);
    await room.remove();
    const rooms = await Room.find({}).sort('room');
    res.status(202).json(rooms);
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так'});
  }
}
else 
res.status(500).json({message:'У вас не достаточно прав'});
});

router.post('/create',auth,async(req,res)=>{
  if (req.rolles==='admin'){
  try {
  const room = new Room({
    room:req.body.room,password:req.body.password,admin:req.body.admin
  })
  await room.save();
  const rooms = await Room.find({}).sort('room');
  res.status(201).json(rooms);
} catch (error) {
  res.status(500).json({message:'Что-то пошло не так'}); 
}
}
else 
res.status(500).json({message:'У вас не достаточно прав'});
});
router.post('/edit',auth,async(req,res)=>{
if (req.rolles==='admin'){ 
const room = req.body.room;
const password = req.body.password;
const admin = req.body.admin;
  try {
    let rooms = await Room.findById(req.body._id);
    rooms.room= room;
    rooms.password = password;
    rooms.admin = admin;
    await rooms.save();
    const newrooms = await Room.find({}).sort('room');
    res.status(202).json(newrooms);
  } catch (error) {
    res.status(500).json('Что-то пошло не так');  
  }
}
else 
res.status(500).json({message:'У вас не достаточно прав'});
})

module.exports = router;