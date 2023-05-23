const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get("/:userId/profile", async (req, res, next) => {
    try {
        // fetch a specific event by Id
        const { userId } = req.params
        const user = await User.fetchUserById({userId})
        return res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
  })

  module.exports = router