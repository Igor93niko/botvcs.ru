const {Router} = require('express');
const Todo = require('../models/Vcs');
const Arhiv = require('../models/Arhiv');
const router = Router();
const auth = require("../middleware/auth.middleware");

async function removeOld(){
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();
  let newDay;
  let newMonth;
  let newYear;
  try {
  const todos = await Todo.find({});
  todos.forEach(async todo=>
    {
      if (todo.day[0]==='0')
      {
          newDay = +todo.day.slice('')[1]
      }
      else{
          newDay = +todo.day
      }
      newMonth = +todo.month
      newYear = +todo.year;
      if (newYear<year||(newMonth<month&&newYear===year)||((newDay<day)&&(newMonth===month)&&(year===newYear)))
      {
        const arhiv = new Arhiv({
          day:todo.day,
          month:todo.month,
          year:todo.year,
          date:todo.date,
          time:todo.time,
          room:todo.room,
          password:todo.password,
          admin:todo.admin,
          place:todo.place
        });
        await arhiv.save();
        const vcs = await Todo.findById(todo._id);
        await vcs.remove();
      }
    });
  } catch (error) {
        console.log(error);
      };
}

router.get('/all',auth,async(req,res)=>{
  await removeOld();
  try {
    const vcs = await Todo.find({}).sort('year').sort('month').sort('day').sort('time');
    res.json(vcs);
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так'});
  }
});
router.get('/:id',auth,async(req,res)=>{
  try {
    const vcs = await Todo.findById(req.params.id);
    res.json(vcs);
  } catch (error) {
    res.json(error);
  }
});

router.get('/delete/:id',auth,async(req,res)=>{
  if (req.rolles==='admin'){
  try {
    const vcs = await Todo.findById(req.params.id);
    const arhiv = new Arhiv({
      day:vcs.day,
      month:vcs.month,
      year:vcs.year,
      date:vcs.date,
      time:vcs.time,
      room:vcs.room,
      password:vcs.password,
      admin:vcs.admin,
      place:vcs.place
    });
    await arhiv.save();
    await vcs.remove();
    const newvcs = await Todo.find({}).sort('year').sort('month').sort('day').sort('time');
    res.status(200).json(newvcs);
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так'});
  }}
  else 
  res.status(500).json({message:'У вас не достаточно прав'});
});

router.post('/create',auth,async(req,res)=>{
if (req.rolles==='admin'){
const time = req.body.time;
const room = req.body.room;
const password = req.body.password;
const admin = req.body.admin;
const place = req.body.place;
let date = req.body.date;
const [year,month,day] = date.split('-');
date = [day,month,year].join('.');
try {
  const vcs = new Todo({
    day,month,year,date,time,room,password,admin,place
  })
  await vcs.save();
  const newvcs = await Todo.find({}).sort('year').sort('month').sort('day').sort('time');
  res.status(201).json(newvcs);
} catch (error) {
  res.status(500).json({message:'Что-то пошло не так'}); 
}}
else 
res.status(500).json({message:'У вас не достаточно прав'});

});
router.post('/edit',auth,async(req,res)=>{
if (req.rolles==='admin'){  
const time = req.body.time;
const room = req.body.room;
const password = req.body.password;
const admin = req.body.admin;
const place = req.body.place;
let date = req.body.date;
const [year,month,day] = date.split('-');
date = [day,month,year].join('.');
  try {
    let vcs = await Todo.findById(req.body._id);
    vcs.time = time;
    vcs.date = date;
    vcs.day = day;
    vcs.month = month;
    vcs.year = year;
    vcs.room= room;
    vcs.password = password;
    vcs.admin = admin;
    vcs.place = place;
    await vcs.save();
    const newvcs = await Todo.find({}).sort('year').sort('month').sort('day').sort('time');
    res.status(202).json(newvcs);
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так'});  
  }
}
else 
res.status(500).json({message:'У вас не достаточно прав'});
})

module.exports = router;