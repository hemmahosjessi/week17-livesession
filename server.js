import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

import techFundings from './data/tech_fundings.json'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/livesession-week18'
mongoose.connect( mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise


const port = process.env.PORT || 3030
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


const Company = mongoose.model('Company', {
  index: Number,
  company: String,
  website: String,
  region: String,
  vertical: String,
  fundingAmountUSD: Number,
  fundingStage: String,
  fundingDate: String
})

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Company.deleteMany({})

    techFundings.forEach(company => {
      const newCompany = new Company(company)
      newCompany.save()
    })
  }

  seedDatabase()
}

// Middleware
app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({ error: 'Service unavailable' })
  }
})

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world HEY')
})

// Get all companies
app.get('/companies', async (req, res) => {
  console.log(req.query)
 let companies = await Company.find(req.query)

 if (req.query.fundingAmountUSD) {
  const companiesByAmount = await Company.find().gt('fundingAmountUSD', req.query.fundingAmountUSD)
  companies = companiesByAmount
 }

 res.json(companies)
})

// Get one company based on id
app.get('/companies/id/:id', async (req, res) => {
  try {
    const companyById = await Company.findById(req.params.id)
    if(companyById) {
      res.json(companyById)
   } else {
     res.status(404).json({error: 'Company not found'})
   } 
  } catch(error) {
    res.status(400).json({error: 'Id is invalid'})
  }
})


app.get('/endpoints', (req,res) => {
  res.send(listEndpoints(app))
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
