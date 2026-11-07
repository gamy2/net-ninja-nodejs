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

app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});