const {Schema,model}=require("mongoose");
const schema= new Schema({
    username:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})

module.exports=model('UserBot',schema);