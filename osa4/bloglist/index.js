require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})