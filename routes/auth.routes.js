const {Router} = require("express");
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require("express-validator");
const jwttoken = require("jsonwebtoken");
const config = require("config");
const router = Router();

router.post('/register',
[
  check('email','Введите email').isEmail(),
  check('password','Минимальная длина пароля 6 символов').isLength({min:6})
],
async(req,res)=>{
  try {
    const errors =validationResult(req);
    if (!errors.isEmpty()){
    return res.status(400).json({
      errors:errors.array(),
      message:'Что-то пошло не так'
    })
    }
    const {email,password} = req.body;
    const candidate = await User.findOne({email});
    if (candidate){
      return res.status(400).json({message:'Такой пользователь уже существует'});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({email,password:hashedPassword});
    await user.save();
    res.status(201).json({message:'Пользователь добавлен успешно'});
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так попробуйте снова'});
  }
});

router.post('/login',
[
  check('email','Введите email').normalizeEmail().isEmail(),
  check('password','Введите пароль').exists()
],
async(req,res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
    return res.status(400).json({
      errors:errors.array(),
      message:'Что-то пошло не так'
    })
    }
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({message:'Такого пользователя не существует'});
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch){
      return res.status(400).json({message:'Пароль не верный'});
    }
    
    const token = jwttoken.sign(
      {userId:user._id},
      config.get('jwtSecret'),
      {expiresIn:'10h'}
    )
    
    res.json({token,userId:user.id,rolles:user.rolles});
  } catch (error) {
    res.status(500).json({message:'Что-то пошло не так попробуйте снова'});
  }
});

module.exports = router;