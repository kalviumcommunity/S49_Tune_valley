const mongoose = require('mongoose');

const FavsSchema = new mongoose.Schema({
    Artist: String,
    Song : String,
    Album: String,
    username: String,

})

const FavsModel = mongoose.model("Favs", FavsSchema);
module.exports = FavsModel;
