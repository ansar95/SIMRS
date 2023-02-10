const express = require("express");
const bodyParser = require("body-parser");
const db = require("./connection");

const app = express();
const port = 5001;

app.use(bodyParser.json());

//ambil semua data product
app.get("/", (req, res) => {
  db.query("SELECT * FROM product", (err, result) => {
    // hasil
    console.log(result);
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  console.log({ requestLogin: req.body });
  res.send("login berhasil!");
});

app.put("/user", (req, res) => {
  console.log({ update: req.body });
  res.send("update berhasil");
});

app.delete("/user", (req, res) => {
  res.send("DELETE request at /user");
});

//server
app.listen(port, () => {
  console.log(`localhost ${port}`);
});
