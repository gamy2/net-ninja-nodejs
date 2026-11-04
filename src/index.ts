import express from "express";
import mainRouter from "./server/routes/main";

const app = express();
const expressLayout = require('express-ejs-layouts');
const PORT = Number(process.env.PORT) || 3000;





//routes
app.use('/', mainRouter);

// assets 
app.use(express.static('public'));

//template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



// listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});