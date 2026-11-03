require('dotenv').config();


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');  
const prot = 5500;


// public Static Folder
app.use(express.static('public'));

// Template Engine
app.use(expressLayouts);
app.set('layout' , './layouts/main');
app.set('view engine' , 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(prot , ()=>{
    console.log(`Server is running on port ${prot}`);
});