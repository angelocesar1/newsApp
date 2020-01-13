const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");
const path = require("path");
const session = require("express-session");
const CONNECTION_STRING = "postgres://localhost:5432/newsdb";
const SALT_ROUNDS = 10;

const VIEWS_PATH = path.join(__dirname, "/views");

// configuring view engine
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");
app.use("/css", express.static("css"));

app.use(
  session({
    secret: "lhadljdfbj",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

const db = pgp(CONNECTION_STRING);

app.post("/users/delete-article", (req, res) => {
  let articleId = req.body.articleId;

  db.none("DELETE FROM articles WHERE articleid = $1", [articleId]).then(() => {
    res.redirect("/users/articles");
  });
});

app.post("/users/update-article", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let articleId = req.body.articleId;

  db.none("UPDATE articles SET title = $1, body = $2 WHERE articleid = $3", [
    title,
    description,
    articleId
  ]).then(() => {
    res.redirect("/users/articles");
  });
});

app.get("/users/articles/edit/:articleId", (req, res) => {
  let articleId = req.params.articleId;

  db.one("SELECT articleid,title,body FROM articles WHERE articleid = $1", [
    articleId
  ]).then(article => {
    res.render("edit-article", article);
  });
});

app.get("/users/add-article", (req, res) => {
  res.render("add-article");
});

app.post("/users/add-article", (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let userId = req.session.user.userId;

  db.none("INSERT INTO articles(title,body,userid) VALUES($1,$2,$3)", [
    title,
    description,
    userId
  ]).then(() => {
    res.send("SUCCESS");
  });
});

app.get("/users/articles", (req, res) => {
  // let userId = req.session.user.userId;

  let userId = 2;

  db.any("SELECT articleid,title,body FROM articles WHERE userid = $1", [
    userId
  ]).then(articles => {
    res.render("articles", { articles: articles });
  });
});

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
          // put username and userid in the session
          if (req.session) {
            req.session.user = { userId: user.userid, username: user.username };
          }

          res.redirect("/users/articles");
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
