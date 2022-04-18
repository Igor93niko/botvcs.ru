const express = require("express");
const config = require("config");
const path = require('path');
const mongoose = require("mongoose");

const app = express();
app.use(express.json({extended:true}));
app.use('/auth',require('./routes/auth.routes'));
app.use('/arhiv',require('./routes/arhiv.routes'));
app.use('/vcs',require('./routes/vcs.routes'));
app.use('/room',require('./routes/room.routes'));
app.use('/users',require('./routes/users.routes'));
if (config.get("production")){
  app.use('/',express.static(path.join(__dirname,'/client','build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const PORT = config.get('port')||5000;

async function start(){
  try {
    await mongoose.connect(config.get('BD_CONN'));
    app.listen(PORT,()=>console.log(`Server has been started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}

start();