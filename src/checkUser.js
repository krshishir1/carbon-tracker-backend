const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {

        const authHeader = req.headers["authorization"]
        const requestToken = authHeader.split(" ")[1]

        if (!requestToken) {
            throw new Error("No token provided")
        }

        const decoded = await jwt.verify(requestToken, "secret")

        if(!decoded) {
            throw new Error("Invalid token")
        }

        req.username = decoded.username
        req.email = decoded.email

        next()

    } catch(err) {
        console.log("Middleware error: ", err.message)
        res.status(500).json({ error: `Middleware error: ${err.message}` });
    }
}