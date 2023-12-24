const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// @desc Login
// @route POST /api/v1/auth/login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const found_user = await User.findOne({ email }).exec();

    if(!found_user || !found_user.active) {
        return res.status(400).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, found_user.password);

    if(!match) return res.status(400).json({ message: 'Unauthorized' });

    const access_token = jwt.sign(
        {
            "UserInfo": {
                "email": found_user.email,
                "firstname": found_user.firstname,
                "lastname": found_user.lastname,
            },
            "Roles": found_user.roles
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "email": found_user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('payload_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({ access_token });
}

// @desc Refresh
// @route GET /api/v1/auth/refresh
// @access Public - because access token is expired
const refresh = (req, res) => {
    const cookies = req.cookies;

    if(!cookies.payload_token) return res.status(401).json({ message: 'Unauthorized' });
    
    jwt.verify(cookies.payload_token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Unauthorized' });

        const found_user = await User.findOne({ email: decoded.email }).exec();

        if(!found_user) return res.status(401).json({ message: 'Unauthorized' });

        const access_token = jwt.sign(
            {
                "UserInfo": {
                    "email": found_user.email,
                    "firstname": found_user.firstname,
                    "lastname": found_user.lastname,
                },
                "Roles": found_user.roles
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        res.status(200).json({ access_token });
    })
}

// @desc Logout
// @route POST /api/v1/auth/logout
// @access Public - to clear the cookie
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('payload_token', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}