const express = require("express")
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens.js")
const security = require("../security")
const router = express.Router()

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body)
    const token = createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body })
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { username } = res.locals.user
    const user = await User.fetchUserByUsername(username)
    const publicUser = User.makePublicUser(user)
    return res.status(200).json({ user: publicUser })
  } catch (err) {
    next(err)
  }
})

module.exports = router