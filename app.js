const express = require("express")
const bodyParser = require("body-parser")
const db = require("./connection")
const respon = require("./responses")

const app = express()
const port = 5001

app.use(bodyParser.json())

//ambil semua data product
app.get("/", (req, res) => {
  const sql = "SELECT * FROM product"
  db.query(sql, (err, result) => {
    // hasil
    respon(200, result, "get all product", res)
  })
})

app.get("/find", (req, res) => {
  const sql = `SELECT product_name FROM product WHERE nim = ${req.query.nim}`
  // console.log("nim:", req.query.nim)
  db.query(sql, (err, result) => {
    // hasil
    respon(200, result, "get name", res)
  })
})

app.post("/login", (req, res) => {
  console.log({ requestLogin: req.body })
  res.send("login berhasil!")
})

app.put("/user", (req, res) => {
  console.log({ update: req.body })
  res.send("update berhasil")
})

app.delete("/user", (req, res) => {
  res.send("DELETE request at /user")
})

//server
app.listen(port, () => {
  console.log(`localhost ${port}`)
})
