const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");

// configuring view engine
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
