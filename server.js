import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import tech_fundings from './data/tech_fundings.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 3000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const users = [
  {id: 1, name: 'Alice', age: 33},
  {id: 2, name: 'Bob', age: 24},
  {id: 3, name: 'Jane', age: 43},
]

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world HEY')
})

app.get('/fundings', (req, res) => {
  res.send(tech_fundings)
})

app.get('/fundings/company', (req, res) => {
  res.send(tech_fundings.map(item => item.Company))
})

app.get('/fundings/index/:index', (req, res) => {
  const index = req.params.index
  res.send(tech_fundings.filter(item => item.index === + index))
})

app.get('/fundings/:index', (req, res) => {
  const { index } = req.params

  const companyId = tech_fundings.find(company => company.index === +index)

  if (!companyId) {
    res.status(404).send('No company found with that Id')
  } else {
    res.json(companyId)
  }
})

// app.get('/users', (req, res) => {
//   res.json([
//     {id: 1, name: 'Alice', age: 33},
//     {id: 2, name: 'Bob', age: 24},
//     {id: 3, name: 'Jane', age: 43}
//   ])
// })

// app.get('/users', (req, res) => {
//   const users = [
//     {id: 1, name: 'Alice', age: 33},
//     {id: 2, name: 'Bob', age: 24},
//     {id: 3, name: 'Jane', age: 43},
//   ]
//   res.json(users)
// })

app.get('/users', (req, res) => {
  res.json(users)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
