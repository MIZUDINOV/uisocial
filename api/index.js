const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const config = require('config')
const cors = require('cors')

//middleware
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

try {
  mongoose.connect(
    config.get('mongoUri'),
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log('Connected to MongoDB')
    }
  )
} catch (error) {}

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.listen(config.get('port') || 5000, () => {
  console.log('Backend server is running on PORT:' + config.get('port'))
})
