import path from "path";
import express from "express";
import expressLayout from "express-ejs-layouts";
import mainRouter from "./server/routes/main";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.static("public"));

app.use(expressLayout);
app.set("views", path.join(import.meta.dir, "views"));
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});