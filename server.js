import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import techFundings from './data/tech_fundings.json'

const port = process.env.PORT || 3030
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

app.get('/endpoints', (req,res) => {
  res.send(listEndpoints(app))
})

// get a list of users
app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/fundings', (req, res) => {
const { company, region } = req.query

let techFundingsToSend = techFundings

if (company) {
  techFundingsToSend = techFundingsToSend.filter(
    (item) => item.Company.toLowerCase().indexOf(company.toLowerCase()) !== -1
    )
}

if (region) {
  techFundingsToSend = techFundingsToSend.filter(
    (item) => item.Region.toLowerCase().indexOf(region.toLowerCase()) !== -1
    )
}

  res.json ({
    response: techFundingsToSend,
    success: true,
  })
})


app.get('/fundings/index/:index', (req, res) => {
  const { index } = req.params

  const companyId = tech_fundings.find(company => company.index === +index)

  if (!companyId) {
    res.status(404).send('No company found with that Id')
  } else {
    res.json(companyId)
  }
})

app.get('/fundings/company/:company', (req, res) => {
  const { company } = req.params

  const companyByName = techFundings.find(item => item.Company === company)

  if (!company) {
    res.status(404).json({
      response: 'No company found with that name',
      success: false
    })
  } else {
    res.status(200).json({
      response: companyByName,
      success: true
    })
  } 
})


app.get('/users', (req, res) => {
  res.json(users)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
