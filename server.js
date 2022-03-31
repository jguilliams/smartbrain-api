const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const PORT = process.env.PORT;

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Success");
});

// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, db, bcrypt);
// });
// app.post("/register", (req, res) => {
//   register.handleRegister(req, res, db, bcrypt);
// });
// app.get("/profile/:id", (req, res) => {
//   profile.handleProfileGet(req, res, db);
// });
//
// app.put("/image", (req, res) => {
//   image.handleImage(req, res, db);
// });

// Instead of the above code, can do the following
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(PORT || 3000, () => {
  console.log(`app is running on port ${PORT}`);
});
