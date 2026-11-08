import path from "path";
import express from "express";
import expressLayout from "express-ejs-layouts";
import mainRouter from "./server/routes/main";
import { connectToMongoDB } from "./server/config/db";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("views", path.join(import.meta.dir, "views"));
app.use(express.static(path.join(import.meta.dir, "public")));



// connect to MongoDB
async function start() {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

start();



// this steps made to make search logic work, otherwise it will not work because the data is not being parsed correctly
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());




app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});