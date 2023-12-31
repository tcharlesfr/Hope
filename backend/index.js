const express = require('express')
const cors = require('cors')

const app = express ()

// config json response
app.use(express.json())

// solve cors
app.use(cors({ credentials:true, origin: 'https://hope-frontend-roan.vercel.app'    }))

// public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const PostRoutes = require('./routes/PostRoutes')

app.use('/users', UserRoutes)
app.use('/posts', PostRoutes)

app.listen(5000)