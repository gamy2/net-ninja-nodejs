import path from "path";
import express from "express";
import expressLayout from "express-ejs-layouts";
import mainRouter from "./server/routes/main";
import adminRouter from "./server/routes/admin";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectToMongoDB } from "./server/config/db";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined in the environment");
}

app.set("views", path.join(import.meta.dir, "views"));
app.use(express.static(path.join(import.meta.dir, "public")));


// this steps made to make search logic work, otherwise it will not work because the data is not being parsed correctly
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
  })
}));




app.use(expressLayout);
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/admin", adminRouter);


// connect to MongoDB
async function start() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
