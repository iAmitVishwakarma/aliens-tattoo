const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authUserMiddleware(req, res, next) {
const token = req.cookies.token;

if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
} catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
}

}


module.exports = {authUserMiddleware};