const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization

    if(!authHeader?.startsWith('Bearer')) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Unauthorized' });

        req.user = decoded.UserInfo;
        req.role = decoded.Roles;

        next();
    })
}

module.exports = verifyJWT;