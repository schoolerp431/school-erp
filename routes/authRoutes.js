const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ message: 'User Not Found' })

  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) return res.status(400).json({ message: 'Wrong Password' })

  const token = jwt.sign(
    { id: user._id, role: user.role, department: user.department },
    process.env.JWT_SECRET,
    { expiresIn: '8h' },
  )

  res.json({ token, role: user.role })
})

module.exports = router
