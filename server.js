const express = require("express");
const fs = require("fs");
const users = require("./users.json");
const app = express();
app.listen(8000);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Home page`);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body);
  fs.writeFileSync(`${__dirname}/users.json`, JSON.stringify(users));
  res.json(req.body);
});

app.patch("/users/:id", (req, res) => {
  const id = +req.params.id;
  const find_user = users.find((user) => user.id === id);
  const update_user = Object.assign(find_user, req.body);
  res.json(update_user);
});

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const delete_user = users.findIndex((user) => user.id === id);
  users.splice(delete_user, 1);
  res.json(users);
});
