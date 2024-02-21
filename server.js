const express = require('express');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()
const port = process.env.PUBLIC_PORT || 8000;

const startDatabase = async() =>{
  try{
    await mongoose.connect(process.env.API_LINK)
    console.log("connected")
  }catch(err){
    console.error(err)
  }
}

const stopDatabase = async() =>{
  try{
    await mongoose.disconnect()
    console.log("disconnected")
  }catch(err){
    console.error(err)
  }
}

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

app.get('/ping', (req, res) => {
  res.json({
    message: 'o_O',
    database: isConnected() ? 'connected' : 'disconnected'
  });
});

process.on('SIGINT', async () => {z
  await stopDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopDatabase();
  process.exit(0);
});

if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}