const express = require('express');
const router = express.Router();
const createRequest = require('./create.bru');
const readRequest = require('./read.bru');
const updateRequest = require('./update.bru');
const deleteRequest = require('./delete.bru');


router.use('/create', (req, res) => {
    createRequest.execute(req, res);
});

router.use('/read', (req, res) => { 
    readRequest.execute(req, res);
});

router.use('/update/:id', (req, res) => {  
    updateRequest.execute(req, res);
});

router.use('/delete/:id', (req, res) => {
    deleteRequest.execute(req, res);
});

module.exports = router;
