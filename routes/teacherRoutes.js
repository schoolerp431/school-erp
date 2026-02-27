const express = require('express')
const Announcement = require('../models/Announcement')
const auth = require('../middleware/auth')
const role = require('../middleware/role')

const router = express.Router()

router.post('/announcement', auth, role('Teacher'), async (req, res) => {
  const newAnnouncement = new Announcement({
    department: req.user.department,
    message: req.body.message,
    createdBy: req.user.id,
  })

  await newAnnouncement.save()
  res.json({ message: 'Submitted For Approval' })
})

module.exports = router
