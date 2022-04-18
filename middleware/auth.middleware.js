const jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../models/Users");
module.exports = async(req,res,next) => {
  if (req.method==='OPTIONS'){
    return next();
  }
  try {
    const token = req.headers.authorization;
    if (!token){
      return res.status(401).json({message:'Нет авторизации'});
    }
    const decoded = jwt.verify(token,config.get('jwtSecret'));
    req.user = decoded;
    const user = await Users.findById(decoded['userId']);
    const rolles = user.rolles;
    req.rolles = rolles;
    next();
  } catch (error) {
    return res.status(401).json({message:'Нет авторизации'});
    
  }
}