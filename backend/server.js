require('dotenv').config()

const express = require('express')
const taskRoutes = require('./routes/task')
const mongoose = require('mongoose')

// Express APP 
const app = express()

// Middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path , req.method)
    next()
})

// Routes
app.use('/api/task',taskRoutes)



// Connect to Mongo Database  

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })

/*
// Listen for requests 
app.listen(process.env.PORT,() => {
    console.log('Listening on port :  ',process.env.PORT)

})
*/