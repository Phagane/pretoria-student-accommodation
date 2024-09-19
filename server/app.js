const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')


dotenv.config({path: './config/config.env'})
const app = express()

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(cors({
    origin:'http://localhost:3000',
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials:true
}))

app.get('/', (req, res)=>{
    res.status(200).json({
        status: 'success',
        message: 'connection successful'
    })
})

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})