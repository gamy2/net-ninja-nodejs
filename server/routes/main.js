const express = require('express');
const router = express.Router();


// routes
router.get('/about', (req, res) => {
    res.send('Hello World');
});


//export to make it available to other files
module.exports = router;