const mongoose = require('mongoose');

const TunevalleyUserSchema = new mongoose.Schema({
    Name: String,
    Email : String,
    password: String

})

const TunevalleyUserModel = mongoose.model("user", TunevalleyUserSchema);
module.exports = TunevalleyUserModel;
