import express from 'express'
import cors from 'cors'

const PORT = 8787
const app = express()

app.use(
  cors({
    origin: 'http://localhost:8087',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/commodities', (req, res) => {
  return res.json({
    commodities: [
      {
        name: '青菜',
        id: 1,
      },
      {
        name: '蘿蔔',
        id: 2,
      },
      {
        name: '水果',
        id: 3,
      },
    ],
  })
})

const shoppingCarRecords = []
app.get('/api/shoppingCarList', (req, res) => {
  return res.json({
    records: shoppingCarRecords,
  })
})
app.post('/api/shoppingCarList', (req, res) => {
  const data = req.body
  // const id = data.id
  const { id } = data
  let record = shoppingCarRecords.find((item) => item.id === id)
  if (!record) {
    record = {
      id,
      amount: 1,
    }
    shoppingCarRecords.push(record)
  } else {
    ++record.amount
  }
  return res.json({
    result: 'ok',
    record,
  })
})
app.get('/api/user', (req, res) => {
  return res.json({
    name: 'Plate',
    description: 'I am rich!',
  })
})

app.listen(PORT, () => console.log(`API server is listening on port ${PORT}!`))
