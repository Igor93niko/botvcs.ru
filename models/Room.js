const {Schema,model} =  require("mongoose");
const schema = new Schema({
  room:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String
  },
  admin:{
    type:String,
    required:true
  }
});
module.exports = new model('Room',schema);