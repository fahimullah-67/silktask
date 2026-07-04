import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide name, email and password')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  const resetToken = crypto.randomBytes(20).toString('hex')
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')

  user.resetPasswordToken = resetTokenHash
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 15 // 15 minutes

  await user.save()

  res.json({
    message: 'Password reset token generated',
    resetToken,
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body
  if (!token || !password) {
    res.status(400)
    throw new Error('Token and password are required')
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid or expired token')
  }

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()

  res.json({ message: 'Password reset successful' })
})

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { registerUser, loginUser, getProfile, updateProfile, forgotPassword, resetPassword }
