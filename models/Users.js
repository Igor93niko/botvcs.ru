const {Schema,model} = require("mongoose");

const schema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  rolles:{
    type:String,
    default:'user'
  }
});
module.exports = model("Auths",schema);