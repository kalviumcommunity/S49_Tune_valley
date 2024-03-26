require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
const port = 8000;

// Import Model
const TunevalleyModel = require('./models/Tunevalley.js');
const TunevalleyUserModel = require('./models/Users.js');
const FavsModel = require('./models/Favs.js');

// Middleware
app.use(cors());
app.use(express.json());

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

// JWT token generation
const generateAccessToken = (email) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

// Joi validation for user data
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Create user route with JWT token generation
app.post('/postUserData', async (req, res) => {
  try {
    let userData = req.body;
    console.log(userData);
    
    // Check if user with the same email already exists
    const existingUser = await TunevalleyUserModel.findOne({ Email: userData.email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const { error } = userSchema.validate(userData);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const newUser = await TunevalleyUserModel.create({
      Name: userData.name,
      Email: userData.email,
      password: userData.password
    });

    const accessToken = generateAccessToken(newUser.Email);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Protected route for getting user data
app.get(`/getUserData`, async (req, res) => {
  try {
    const users = await TunevalleyUserModel.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Middleware for verifying JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Route for getting all Tunevalley data
app.get(`/getTunevalley`, async (req, res) => {
  try {
    const tunevalleyData = await TunevalleyModel.find();
    res.json(tunevalleyData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for updating favourite data
app.put('/update/data', async (req, res) => {
  try {
    // Assuming you receive the updated favourite data in req.body
    // Your logic to update favourite data in the database
    res.json({ message: "Favourite data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for creating favourite data
app.post("/createFav", async (req, res) => {
  try {
    // Assuming you receive the new favourite data in req.body
    const newFavourite = await FavsModel.create(req.body);
    res.json(newFavourite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for getting all favourite data
app.get("/fav",  async (req, res) => {
  try {
    // Fetch all favourites from the database
    const allFavourites = await FavsModel.find();
    res.json(allFavourites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for getting a specific favourite by id
app.get('/getFav/:id',  async (req, res) => {
  try {
    const favouriteId = req.params.id;
    // Find favourite by id in the database
    const favourite = await FavsModel.findById(favouriteId);
    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json(favourite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for updating favourite data by id
app.put('/updateFav/:id',  async (req, res) => {
  try {
    const favouriteId = req.params.id;
    // Assuming you receive the updated favourite data in req.body
    // Find favourite by id and update in the database
    const updatedFavourite = await FavsModel.findByIdAndUpdate(favouriteId, req.body, { new: true });
    if (!updatedFavourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json(updatedFavourite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route for deleting a favourite by id
app.delete('/deleteFav/:id',  async (req, res) => {
  try {
    const favouriteId = req.params.id;
    // Find favourite by id and delete from the database
    const deletedFavourite = await FavsModel.findByIdAndDelete(favouriteId);
    if (!deletedFavourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json({ message: "Favourite deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`Server running on PORT: ${port}`);
  });
}

module.exports = app;
