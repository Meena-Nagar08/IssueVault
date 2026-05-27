const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        // get token from request header
        const token = req.headers.authorization?.split(" ")[1];

        // if no token found
        if(!token) {
            return res.status(401).json({message: "No token, access denied"});
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = decoded;

        next();
    } catch(error){
        res.status(401).json({message: "Invalid token"})
    }
};

module.exports = authMiddleware;