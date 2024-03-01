const mongoose = require('mongoose');

const TunevalleyUserSchema = new mongoose.Schema({
    Email : String,
    Favourite_Artist: String,
    Genre: String,
    Name: String

})

const TunevalleyUserModel = mongoose.model("user", TunevalleyUserSchema);
module.exports = TunevalleyUserModel;
