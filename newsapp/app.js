const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");
const CONNECTION_STRING = "postgres://localhost:5432/newsdb";
const SALT_ROUNDS = 10;

// configuring view engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));

const db = pgp(CONNECTION_STRING);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.oneOrNone(
    "SELECT userid,username,password FROM users WHERE username =$1",
    [username]
  ).then(user => {
    if (user) {
      // check for users password
      bcrypt.compare(password, user.password, function(error, result) {
        if (result) {
          res.send("SUCCESS!");
        } else {
          res.render("login", { message: "Invalid username or password" });
        }
      });
    } else {
      // if user does not exist
      res.render("login", { message: "Invalid username or password" });
    }
  });
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.oneOrNone("SELECT userid FROM users WHERE username = $1", [username]).then(
    user => {
      if (user) {
        res.render("register", { message: "User name already exists!" });
      } else {
        //insert user into the users table

        bcrypt.hash(password, SALT_ROUNDS, function(error, hash) {
          if (error == null) {
            db.none("INSERT INTO users(username,password) VALUES($1,$2)", [
              username,
              hash
            ]).then(() => {
              res.send("SUCCESS");
            });
          }
        });
      }
    }
  );
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
