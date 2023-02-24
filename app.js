const express = require("express")
const bodyParser = require("body-parser")
const db = require("./connection")
const respon = require("./responses")
const { check, validationResult } = require("express-validator")

const app = express()
const port = 5001

app.use(bodyParser.json())

//ambil semua data product
app.get("/", (req, res) => {
  respon(200, "Api V1", "Ready", res)
})

//ambil semua data product
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM product"
  db.query(sql, (err, result) => {
    if (err) throw err
    respon(200, result, "get all product", res)
  })
})

// ambil data berdasarkan id
app.get("/product/:id", (req, res) => {
  const id = req.params.id
  // console.log(`nim : ${nim}`)

  const sql = `SELECT * FROM product WHERE product_id = ${id}`
  db.query(sql, (err, result) => {
    // console.log(result)
    if (err) throw err
    respon(200, result, "Detail", res)
  })
})

// ambil data berdasarkan nim
app.get("/cari/:nim", (req, res) => {
  const nim = req.params.nim
  // console.log(`nim : ${nim}`)

  const sql = `SELECT * FROM product WHERE nim = ${nim}`
  db.query(sql, (err, result) => {
    // console.log(result)
    if (err) throw err
    respon(200, result, "Detail", res)
  })
})
// add data
app.post(
  "/product",
  [
    check("nim")
      .isLength({ min: 3 })
      .withMessage("minimal 3 angka")
      .notEmpty()
      .withMessage("tidak boleh kosong")
      .isNumeric()
      .withMessage("nim harus angka"),
    check("product_name").notEmpty(),
    check("product_price").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return respon(400, errors, "error", res)
    }
    const { nim, product_name, product_price } = req.body

    const sql = `INSERT INTO product (nim, product_name, product_price) VALUES (${nim},'${product_name}',${product_price})`
    db.query(sql, (err, result) => {
      if (err) respon(500, "invalid add", "error", res)
      if (result?.affectedRows) {
        const data = {
          isAdd: result.affectedRows,
          id: result.insertId,
        }
        respon(200, data, "Added Berhasil", res)
      }
    })
  },
)
// edit data
app.put("/product", (req, res) => {
  const { nim, product_name, product_price } = req.body
  const sql = `UPDATE product SET product_name = '${product_name}', product_price = '${product_price}' WHERE nim = '${nim}'`
  db.query(sql, (err, result) => {
    if (err) respon(500, "invalid update", "error", res)
    if (result?.affectedRows) {
      const data = {
        isUpdate: result.affectedRows,
        massage: result.message,
      }
      respon(200, data, "Update Berhasil", res)
    } else {
      respon(404, "Data tidak di temukan ", "Error", res)
    }
  })
})
// delete data
app.delete("/product", (req, res) => {
  const { nim } = req.body
  const sql = `DELETE FROM product WHERE nim = ${nim}`
  db.query(sql, (err, result) => {
    if (err) respon(500, "Invalid Delete", "error", res)
    if (result?.affectedRows) {
      const data = {
        isDelete: result.affectedRows,
      }
      respon(200, data, "Delete Berhasil", res)
    } else {
      respon(404, "Data tidak di temukan", "Error", res)
    }
  })
})

//server
app.listen(port, () => {
  console.log(`localhost ${port}`)
})
