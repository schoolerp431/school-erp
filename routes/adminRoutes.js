const express = require('express')
const Announcement = require('../models/Announcement')
const auth = require('../middleware/auth')
const role = require('../middleware/role')

const router = express.Router()

router.get('/all-announcements', auth, role('Admin'), async (req, res) => {
  const data = await Announcement.find()
  res.json(data)
})

router.put('/approve/:id', auth, role('Admin'), async (req, res) => {
  await Announcement.findByIdAndUpdate(req.params.id, { approved: true })
  res.json({ message: 'Approved' })
})

module.exports = router
