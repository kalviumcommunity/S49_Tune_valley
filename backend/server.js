require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi')
const MONGODB_URL = process.env.MONGODB_URL;
// const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
const cors =require('cors')//Cross-origin resource sharing 
const port = 8000;

// Import CRUD routes
const router = require('./routes.js');

// Import Model
const TunevalleyModel = require('./models/Tunevalley.js');
const TunevalleyUserModel = require('./models/Users.js');
const FavsModel = require('./models/Favs.js');


// Middleware for parsing request bodies
// app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use("/crud",router)

// Connect to MongoDB
const startDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

// Disconnect from MongoDB
const stopDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
};

// Check MongoDB connection status
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Ping route to check server status
app.get('/ping', (req, res) => {
  res.json({
    message: 'Server is running',
    database: isConnected() ? 'connected' : 'disconnected',
  });
});


app.get(`/getTunevalley`, async (req,res) =>{
 let x = await TunevalleyModel.find()
  .then(year => res.json(year))
  .catch(err => res.json(err))
  console.log(x)
})

// Joi validation for user data

app.put('/update/data', (req, res) => {
  const {error} = updateFavSchema.validate(req.body)
  if(error){
    return res.status(400).json({error:error.details[0].message})
  }
  
  res.json({message:"Updated Fav data recieved successsfully"}); 
});


const schema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  password:Joi.string().min(6).required()
})

app.post('/postUserData', async (req,res) =>{
  let x= req.body
  console.log("data",x)
  const {error} = schema.validate(req.body)
  if(error){
    console.log(error.details[0].message,"sfsf")
    return res.status(400).send({"message":error.details[0].message})
  }
  
    let a =await TunevalleyUserModel.create({
    Name: x.name,
    Email : x.email,
    password: x.password    
    })
   .then(users => res.json(users))
   .catch(err => res.json(err))
   console.log(a)
 })

app.get(`/getUserData`,async(req,res) =>{

  let b = await TunevalleyUserModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
  console.log(b)
})

//FAV
// Joi validation for favourite details
const favSchema = Joi.object({
  Artist:Joi.string().required(),
  Song:Joi.string().required(),
 Album:Joi.string().required(),
})

app.post("/createFav", async(req,res) =>{
  // let x= req.body
  // console.log("data",x)
  const {error} = favSchema.validate(req.body)
  if(error){
    console.log(error.details[0].message,"vwsd")
    return res.status(400).send({"message":error.details[0].message})
  }

await FavsModel.create(req.body)
.then(favs => res.json(favs))
.catch(err => res.json(err))
})

app.get("/fav", async(req,res) =>{
  let f = await FavsModel.find()
  res.send(f);
})

app.get('/getFav/:id',(req,res) =>{
  const id = req.params.id;
  FavsModel.findById({_id:id})
  .then(favs => res.json(favs))
  .catch(err=>res.json(err))
})
//Joi validation for update user details
const updateFavSchema = Joi.object({
  Artist:Joi.string().required(),
  Song:Joi.string().required(),
 Album:Joi.string().required(),
})
app.put('/updateFav/:id',(req,res)=>{
  const {error} = updateFavSchema.validate(req.body)
  if(error){
    console.log(error.details[0].message,"vwsd")
    return res.status(400).send({"message":error.details[0].message})
  }


  const id = req.params.id;
   FavsModel.findByIdAndUpdate({_id:id},{
     Artist:req.body.Artist,
     Song: req.body.Song,
     Album: req.body.Album})
   .then(favs => res.json(favs))
   .catch(err => res.json(err))  
})

  app.delete('/deleteFav/:id', (req,res) =>{
    const id = req.params.id;
    FavsModel.findByIdAndDelete({_id: id})
    .then(res => console.log(res))
    .catch(err => res.json(err))
 
  })


// Start the server
if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`Server running on PORT: ${port}`);
  });
}



module.exports = app;