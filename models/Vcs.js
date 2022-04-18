const {Schema, model}=require('mongoose')
const schema=new Schema({
    day:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    },
    date:{
        type:String,
    },
    time:{
        type:String
    },
    room:{
        type:String
    },
    password:{
        type:String
    },
    admin:{
        type:String
    },
    place:{
        type:String
    }
})

module.exports=model('Vcs',schema)