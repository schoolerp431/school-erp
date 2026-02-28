require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const teacherRoutes = require('./routes/teacherRoutes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully ✅'))
  .catch((err) => console.log('MongoDB Error:', err))

app.use('/api', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/teacher', teacherRoutes)

const PORT = process.env.PORT || 3000
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})
app.listen(PORT, () => console.log('Server running on port', PORT))
