const mongoose = require('mongoose');

const TunevalleyUserSchema = new mongoose.Schema({
    username: String,
    Email : String,
    password: String

})

const TunevalleyUserModel = mongoose.model("user", TunevalleyUserSchema);
module.exports = TunevalleyUserModel;
