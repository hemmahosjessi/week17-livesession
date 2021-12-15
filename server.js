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


const User = mongoose.model('User', {
  name: String,
  age: Number,
})

const newUser = new User({
  name: 'Jessi',
  age: 46
})

const newUser2 = new User({
  name: 'Peter',
  age: 48
})

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await User.deleteMany({})

    newUser.save()
    newUser2.save()
  }

  seedDatabase()
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world HEY')
})

app.get('/endpoints', (req,res) => {
  res.send(listEndpoints(app))
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
