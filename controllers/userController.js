const User = require('../models/User');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /api/v1/users
// @access Private
const getAllUsers = async (req, res) => {};

// @desc Create new user
// @route POST /api/v1/users
// @access Private
const createNewUser = async (req, res) => {
    const { email, firstname, lastname, password, roles } = req.body

    // Confirm data
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Email' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { email, "password": hashedPwd, firstname, lastname }
        : {  email, "password": hashedPwd, firstname, lastname, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `${firstname} ${lastname} (${email}) created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

module.exports = {
    createNewUser
}