const express = require("express");
const app = express();

app.use(log);

function log(req, res, next) {
  console.log("Logged");
  console.log("Logged Code 1");
  console.log("Logged Code 2");
  console.log("Logged Code 3");

  next();
}

app.get("/", (req, res) => {
  res.send("ROOT");
});

app.get("/login", (req, res) => {
  res.send("LOGIN");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
