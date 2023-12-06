// import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv";
// import flash from "express-flash";
// import session from "express-session";
// import cookie from "cookie-parser";
// import { fileURLToPath } from "url";
// import { dirname, join as j } from "path";

// import Router from "./modules/router.js";
dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const app = express();
// app.use(cookie(process.env.SECRET));
// app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static(j(__dirname + "/public")));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: false,
//   })
// );
// app.use(flash());
// app.use(Router);
// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     app.listen(
//       process.env.PORT,
//       console.log("GSC running http://localhost:5000")
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });
import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(process.env.PORT, console.log("running"));
