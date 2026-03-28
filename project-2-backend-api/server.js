const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.get("/products", async (req,res)=>{

  try{
    const result = await pool.query("SELECT * FROM products")
    res.json(result.rows)
  }catch(err){
    res.status(500).json({message:"Server error"})
  }

})

app.post("/products", async (req,res)=>{

  const name = req.body.name
  const price = req.body.price

  if(!name || !price){
    return res.status(400).json({message:"Name and price required"})
  }

  if(price <= 0){
    return res.status(400).json({message:"Price must be positive"})
  }

  try{

    const result = await pool.query(
      "INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *",
      [name,price]
    )

    res.status(201).json(result.rows[0])

  }catch(err){
    res.status(500).json({message:"Server error"})
  }

})

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT)
})