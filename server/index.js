import express from 'express'
import cors from 'cors'

const PORT = 8787
const app = express()

app.use(
  cors({
    origin: 'http://localhost',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/commodities', (req, res) => {
  return res.json({})
})
app.get('/api/shoppingCarList', (req, res) => {
  return res.json({})
})
app.get('/api/user', (req, res) => {
  return res.json({
    name: 'Plate',
    description: 'I am rich!',
  })
})

app.listen(PORT, () => console.log(`API server is listening on port ${PORT}!`))
