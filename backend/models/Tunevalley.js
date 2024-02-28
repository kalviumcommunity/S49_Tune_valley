const mongoose = require('mongoose');

const TunevalleySchema = new mongoose.Schema({
    Year: Number
})

const TunevalleyModel = mongoose.model("year", TunevalleySchema);
module.exports = TunevalleyModel;

// function to get data from the database